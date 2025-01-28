import{b as m,q as l,j as e}from"../entry/index-poDKF_yo.js";import{c as p}from"./user-api-cqZYb3fC.js";import{u}from"./hooks-PobqOnIT.js";import"./warning-TWdzD0xt.js";import{u as c}from"./useForm-e9JkNcIS.js";import"./index-94wIOjEc.js";import"./createSuper--Su-1rZR.js";const b=()=>{const n=m(),[r]=c(),s=l(),i=u("PATCH");s!=null&&s.result&&r.resetFields();const d=t=>{i||n(t,{method:"PATCH"})};return e.jsx(antd.Form,{style:{maxWidth:600},labelCol:{span:4},wrapperCol:{span:16},onFinish:d,form:r,children:e.jsxs(antd.Spin,{spinning:i,delay:200,children:[e.jsx(antd.Form.Item,{label:"原密码",name:"old_pwd",rules:[{required:!0,message:"请输入原密码"},{pattern:/^\S{6,15}$/,message:"密码长度为6-15位"}],validateFirst:!0,children:e.jsx(antd.Input,{type:"password"})}),e.jsx(antd.Form.Item,{label:"新密码",name:"new_pwd",dependencies:["old_pwd"],rules:[{required:!0,message:"请输入新密码"},{pattern:/^\S{6,15}$/,message:"密码长度为6-15位"},({getFieldValue:t})=>({validator(o,a){return a===t("old_pwd")?Promise.reject(new Error("新密码不能与原密码相同")):Promise.resolve()}})],validateFirst:!0,children:e.jsx(antd.Input,{type:"password"})}),e.jsx(antd.Form.Item,{label:"确认密码",name:"re_pwd",dependencies:["new_pwd"],rules:[{required:!0,message:"请确认密码"},{pattern:/^\S{6,15}$/,message:"密码长度为6-15位"},({getFieldValue:t})=>({validator(o,a){return a!==t("new_pwd")?Promise.reject(new Error("两次密码输入不一致")):Promise.resolve()}})],validateFirst:!0,children:e.jsx(antd.Input,{type:"password"})}),e.jsx(antd.Form.Item,{wrapperCol:{offset:4},children:e.jsxs(antd.Space,{children:[e.jsx(antd.Button,{type:"primary",htmlType:"submit",children:"保存"}),e.jsx(antd.Button,{type:"default",onClick:()=>r.resetFields(),children:"重置"})]})})]})})},g=async({request:n})=>{const r=await n.formData();try{await p(r)}catch{return null}return antd.message.success("密码修改成功"),{result:!0}};export{g as action,b as default};
