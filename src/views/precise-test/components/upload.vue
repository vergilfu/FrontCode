<template>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      请上传DMP导出的测试用例
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
        选择
      </el-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null,
        multiHeader: null
      }
    }
  },
  methods: {
    generateData({ headers, results, multiHeader }) {
      this.excelData.header = headers
      this.excelData.results = results
      this.excelData.multiHeader = multiHeader
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const { multiHeader, headers } = this.getHeaderRow(worksheet)

          const results = this.getTabledata(worksheet, multiHeader, headers)
          this.generateData({ headers, results, multiHeader })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getTabledata(sheet, multiHeader, header) {
      const results = XLSX.utils.sheet_to_json(sheet)
      const new_result = []
      if (multiHeader.length > 0 && multiHeader[0][0].startsWith('用例管理')) {
        // dmp用例模板
        let _pfix = '__EMPTY'
        if (results[3]['__EMPTY'] === undefined) {
          // 特殊处理一下
          _pfix = ''
        }
        for (let i = 3; i < results.length; i++) {
          const row = results[i]
          const _tempRow = {}
          for (let j = 0; j < header.length; j++) {
            const _key = header[j]
            if (j === 0) {
              _tempRow[_key] = row[multiHeader[0][0]]
            } else if (j === 1) {
              _tempRow[_key] = row[_pfix]
            } else {
              const _index = j - 1
              _tempRow[_key] = row[_pfix + '_' + _index]
            }
          }
          new_result.push(_tempRow)
        }
        return new_result
      }
      return results
    },
    getHeaderRow(sheet) {
      const headers = []
      const multiHeader = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      let row
      // 第一个单元格
      const first_data = XLSX.utils.format_cell(sheet[XLSX.utils.encode_cell({ c: 0, r: 0 })])
      if (first_data.startsWith('用例管理')) {
        for (row = range.s.r; row <= range.e.r; ++row) {
          if (row > 3) {
            // 只处理前4行
            break
          }
          const temp = []
          for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
            const cell = sheet[XLSX.utils.encode_cell({ c: C, r: row })]
            /* find the cell in the first row */
            let hdr = '' // <-- replace with your desired default
            if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
            if (row <= 2) {
              temp.push(hdr)
            } else {
              headers.push(hdr)
            }
          }
          if (row <= 2) {
            multiHeader.push(temp)
          }
        }
      } else {
        for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
          const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
          /* find the cell in the first row */
          let hdr = 'Null' // <-- replace with your desired default
          if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
          headers.push(hdr)
        }
      }

      return { multiHeader, headers }
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
