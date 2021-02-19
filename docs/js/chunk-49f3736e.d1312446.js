(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-49f3736e"],{"02aa":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"product-add"},[a("div",{staticClass:"steps"},[a("a-steps",{attrs:{current:t.current}},t._l(t.steps,(function(t){return a("a-step",{key:t.title,attrs:{title:t.title}})})),1)],1),a("a-form-model",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-col":{span:3},"wrapper-col":{span:14}}},[0===t.current?a("div",{staticClass:"base-info"},[a("a-form-model-item",{attrs:{label:"商品标题",prop:"title",required:""}},[a("a-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),a("a-form-model-item",{attrs:{label:"商品描述",prop:"desc"}},[a("a-input",{attrs:{type:"textarea"},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc",e)},expression:"form.desc"}})],1),a("a-form-model-item",{attrs:{label:"商品类目",prop:"category"}},[a("a-select",{on:{change:t.handleCategoryChange},model:{value:t.form.category,callback:function(e){t.$set(t.form,"category",e)},expression:"form.category"}},t._l(t.categoryList,(function(e){return a("a-select-option",{key:e.id},[t._v(t._s(e.name))])})),1),a("a-select",{attrs:{placeholder:"商品子类目"},model:{value:t.form.c_item,callback:function(e){t.$set(t.form,"c_item",e)},expression:"form.c_item"}},t._l(t.cItems,(function(e,r){return a("a-select-option",{key:r,attrs:{value:e}},[t._v(" "+t._s(e)+" ")])})),1)],1),a("a-form-model-item",{attrs:{label:"商品标签",prop:"tags",required:""}},[a("a-select",{staticStyle:{width:"100%"},attrs:{mode:"tags"},model:{value:t.form.tags,callback:function(e){t.$set(t.form,"tags",e)},expression:"form.tags"}},[a("a-select-option",{key:"包邮，最迟次日达"},[t._v(" 包邮，最迟次日达 ")])],1)],1)],1):a("div",{staticClass:"sale-info"},[a("a-form-model-item",{attrs:{label:"商品售价",prop:"price",required:""}},[a("a-input",{model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}})],1),a("a-form-model-item",{attrs:{label:"商品折扣价",prop:"price_off"}},[a("a-input",{model:{value:t.form.price_off,callback:function(e){t.$set(t.form,"price_off",e)},expression:"form.price_off"}})],1),a("a-form-model-item",{attrs:{label:"商品库存",prop:"inventory",required:""}},[a("a-input",{model:{value:t.form.inventory,callback:function(e){t.$set(t.form,"inventory",e)},expression:"form.inventory"}})],1),a("a-form-model-item",{attrs:{label:"计量单位",prop:"unit",required:""}},[a("a-input",{model:{value:t.form.unit,callback:function(e){t.$set(t.form,"unit",e)},expression:"form.unit"}})],1),a("a-form-model-item",{attrs:{label:"商品相册",prop:"images",required:""}},[a("a-upload",{attrs:{action:"https://mallapi.duyiedu.com/upload/images?appkey="+t.$store.state.user.appkey,multiple:!0,"list-type":"picture-card","file-list":t.fileList,name:"avatar"},on:{preview:t.handlePreview,change:t.handleChange}},[t.fileList.length<8?a("div",[a("a-icon",{attrs:{type:"plus"}}),a("div",{staticClass:"ant-upload-text"},[t._v(" 上传图片 ")])],1):t._e()]),a("a-modal",{attrs:{visible:t.previewVisible,footer:null},on:{cancel:t.handleCancel}},[a("img",{staticStyle:{width:"100%"},attrs:{alt:"example",src:t.previewImage}})])],1),a("a-form-model-item",{staticClass:"product-stauts",attrs:{"wrapper-col":{span:20},prop:"status"}},[a("a-checkbox",{attrs:{checked:t.isChecked},on:{change:t.changeStatus}},[t._v(" 是否上架 ")])],1)],1),a("a-form-model-item",{attrs:{"wrapper-col":{span:20}}},[a("div",{staticClass:"step-operate"},[t.current<t.steps.length-1?a("a-button",{attrs:{type:"primary"},on:{click:t.next}},[t._v(" 下一步 ")]):t._e(),t.current==t.steps.length-1?a("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v(" 提交 ")]):t._e(),t.current>0?a("a-button",{staticStyle:{"margin-left":"8px"},on:{click:t.prev}},[t._v(" 上一步 ")]):t._e()],1)])],1)],1)},s=[],i=(a("4de4"),a("d81d"),a("d3b7"),a("4ec3"));var o={created:function(){this.$route.params.id&&(console.log(this.$route.params.id),this.getProductInfo(this.$route.params.id)),this.getCategoryList()},data:function(){return{current:0,steps:[{title:"填写商品基本信息"},{title:"填写商品销售信息"}],form:{title:"",desc:"",category:1,c_item:[],tags:[],price:0,price_off:0,unit:"",status:0,images:[],inventory:0,sale:0},cItems:[],categoryList:[],rules:{},tags:[],previewVisible:!1,previewImage:"",fileList:[],isChecked:!1}},methods:{getCategoryList:function(){var t=this;i["a"].getCategoryList().then((function(e){"success"===e.status&&(t.categoryList=e.data.data,t.cItems=e.data.data.filter((function(e){return e.id===t.form.category}))[0]["c_items"])}))},next:function(){this.current++},prev:function(){this.current--},handleChange:function(t){var e=t.fileList;this.form.images=e,this.fileList=e},handleCategoryChange:function(t){this.cItems=this.categoryList.filter((function(e){return e.id===t}))[0]["c_item"]},handleCancel:function(){},handlePreview:function(){},getProductInfo:function(t){var e=this;i["a"].getProductInfo(t).then((function(t){"success"===t.status&&(e.fileList=t.data.images.map((function(t,e){return{uid:e,name:"image-"+e+".png",status:"done",url:t}})),e.form=t.data,console.log("d",e.form))}))},changeStatus:function(t){this.isChecked=t.target.checked,this.form.status=this.isChecked?1:0},submitForm:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return e.$message.error("您未填好商品必填信息！"),!1;e.$route.params.id?i["a"].editProduct(e.form).then((function(t){"success"===t.status&&e.$router.push({name:"ProductList"})})):i["a"].addProductInfo(e.form).then((function(t){"success"===t.status&&e.$router.push({name:"ProductList"})}))}))}}},n=o,c=(a("54aa"),a("2877")),l=Object(c["a"])(n,r,s,!1,null,"7314efe4",null);e["default"]=l.exports},"54aa":function(t,e,a){"use strict";a("9439")},9439:function(t,e,a){}}]);
//# sourceMappingURL=chunk-49f3736e.d1312446.js.map