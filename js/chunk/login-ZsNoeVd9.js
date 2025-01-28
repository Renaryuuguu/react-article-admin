import{u as n,a as i,j as e,L as o,s as l}from"../entry/index-z2ldqZB7.js";import{L as m,l as c}from"./auth-api-R4NumtiF.js";import{U as d}from"./UserOutlined-BHLVQL_1.js";import"./warning-9o34qDdD.js";import"./AntdIcon-bP-MOnYo.js";import"./index-IOKQZmPc.js";const f=()=>{const[a]=n(),s=i(),t=r=>{s.state!=="submitting"&&s.submit(r,{method:"POST",action:"/login"})};return e.jsxs(antd.Form,{wrapperCol:{span:24},labelCol:{span:4},onFinish:t,initialValues:{username:a.get("uname")},children:[e.jsx(antd.Form.Item,{name:"username",label:"用户名",rules:[{required:!0,message:"请输入用户名"},{pattern:/^[0-9a-zA-Z]{1,10}$/,message:"用户名必须是1-10位的字母数字！"}],children:e.jsx(antd.Input,{prefix:e.jsx(d,{}),placeholder:"请输入用户名"})}),e.jsx(antd.Form.Item,{name:"password",label:"密码",rules:[{required:!0,message:"请输入密码"},{pattern:/^\S{6,15}$/,message:"密码必须是6-15位的非空字符！"}],children:e.jsx(antd.Input,{prefix:e.jsx(m,{}),type:"password",placeholder:"请输入密码"})}),e.jsx(antd.Form.Item,{wrapperCol:{offset:4},children:e.jsxs(antd.Space,{direction:"vertical",children:[e.jsx(antd.Button,{type:"primary",htmlType:"submit",loading:s.state==="submitting"&&{delay:200},children:"登录"}),e.jsxs("div",{children:["转到 ",e.jsx(o,{to:"/reg",children:"注册"})]})]})})]})},b=async({request:a})=>{const s=await a.formData();try{const t=await c(s);return antd.message.success(t.message),l(t.token),null}catch{return null}};export{b as action,f as default};
