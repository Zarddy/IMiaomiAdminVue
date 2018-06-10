<template>
    <div class="account-login">

    <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <div class="grid-content bg-purple"></div>
                <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px" class="demo-ruleForm" @keyup.enter="submitForm('loginForm')">
                    <el-form-item label="账号" prop="account">
                        <el-input type="text" v-model="loginForm.account" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')">登 录</el-button>
                    </el-form-item>
                </el-form>
        </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
    data() {
        var validateAccount = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };

        return {
            loginForm: {
                account: '',
                password: ''
            },
            rules2: {
                account: [
                    { validator: validateAccount, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            }
        };
    },
    mounted() {
        this.$http.defaults.headers['Authorization'] = '';
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) { // 提交登录信息
                    // 创建form表单数据
                    // let params = new FormData();
                    // params.append("account", this.loginForm.account);
                    // params.append("password", this.loginForm.password);
                    // 以post形式提交
                    this.$http.post('/login', {"account": this.loginForm.account,
                    "password": this.loginForm.password}).then(
                        data=> {
                            if (data.code == 200) {
                                // TODO 登录成功，将会返回token
                                console.log("登录成功，token: " + data.result.token);

                                this.$http.defaults.headers['Authorization'] = data.result.token;

                                let base64Data = Base64.encode(JSON.stringify({ token: data.result.token}));
                                sessionStorage.setItem("user", base64Data);

                                // 跳转到List页面
                                this.$router.push({path: '/cat/list'});

                            } else {
                                // 登录失败
                            }
                        }
                    )
                    return true;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.account-login {

    margin-top: 25%;

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
  
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
  
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    
    body > .el-container {
        margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
}
</style>
