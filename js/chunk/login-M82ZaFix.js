import{u as o,a as m,j as e,B as l,L as c,s as u}from"../entry/index-HYVjuyXu.js";import{L as p,l as d}from"./auth-api-43V3CIlr.js";import{F as r,I as i}from"./index-vkfpJKNu.js";import{U as h}from"./UserOutlined-WPzHvk6u.js";import{S as x}from"./index-FvAIaAj1.js";import{s as j}from"./index-Ofe16QpN.js";import"./EyeOutlined-9LXoceyI.js";import"./collapse-as1LdTNY.js";const w=()=>{const[a]=o(),s=m(),t=n=>{s.state!=="submitting"&&s.submit(n,{method:"POST",action:"/login"})};return e.jsxs(r,{onFinish:t,initialValues:{username:a.get("uname")},children:[e.jsx(r.Item,{name:"username",label:"用户名",rules:[{required:!0,message:"请输入用户名"},{pattern:/^[0-9a-zA-Z]{1,10}$/,message:"用户名必须是1-10位的字母数字！"}],children:e.jsx(i,{prefix:e.jsx(h,{}),placeholder:"请输入用户名"})}),e.jsx(r.Item,{name:"password",label:"密码",rules:[{required:!0,message:"请输入密码"},{pattern:/^\S{6,15}$/,message:"密码必须是6-15位的非空字符！"}],children:e.jsx(i,{prefix:e.jsx(p,{}),type:"password",placeholder:"请输入密码"})}),e.jsx(r.Item,{children:e.jsxs(x,{direction:"vertical",children:[e.jsx(l,{type:"primary",htmlType:"submit",loading:s.state==="submitting"&&{delay:200},children:"登录"}),e.jsxs("div",{children:["转到 ",e.jsx(c,{to:"/reg",children:"注册"})]})]})})]})},F=async({request:a})=>{const s=await a.formData();try{const t=await d(s);return j.success(t.message),u(t.token),null}catch{return null}};export{F as action,w as default};
