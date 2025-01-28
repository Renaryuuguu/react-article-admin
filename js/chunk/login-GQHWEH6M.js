import{u as n,a as i,j as e,L as o,s as m}from"../entry/index-Oeu-jSFw.js";import{L as l,l as c}from"./auth-api-y-ygO5WD.js";import{U as d}from"./UserOutlined-EJCgelnp.js";import"./warning-lDOmVzUb.js";import"./AntdIcon-ZXgOBoQN.js";import"./index-s-kAbaNS.js";const f=()=>{const[r]=n(),t=i(),s=a=>{t.state!=="submitting"&&t.submit(a,{method:"POST",action:"/login"})};return e.jsxs(antd.Form,{onFinish:s,initialValues:{username:r.get("uname")},children:[e.jsx(antd.Form.Item,{name:"username",label:"用户名",rules:[{required:!0,message:"请输入用户名"},{pattern:/^[0-9a-zA-Z]{1,10}$/,message:"用户名必须是1-10位的字母数字！"}],children:e.jsx(antd.Input,{prefix:e.jsx(d,{}),placeholder:"请输入用户名"})}),e.jsx(antd.Form.Item,{name:"password",label:"密码",rules:[{required:!0,message:"请输入密码"},{pattern:/^\S{6,15}$/,message:"密码必须是6-15位的非空字符！"}],children:e.jsx(antd.Input,{prefix:e.jsx(l,{}),type:"password",placeholder:"请输入密码"})}),e.jsx(antd.Form.Item,{children:e.jsxs(antd.Space,{direction:"vertical",children:[e.jsx(antd.Button,{type:"primary",htmlType:"submit",loading:t.state==="submitting"&&{delay:200},children:"登录"}),e.jsxs("div",{children:["转到 ",e.jsx(o,{to:"/reg",children:"注册"})]})]})})]})},y=async({request:r})=>{const t=await r.formData();try{const s=await c(t);return antd.message.success(s.message),m(s.token),null}catch{return null}};export{y as action,f as default};
