# GitHub Pages 部署指南

## 自动部署设置

本项目已配置GitHub Actions来自动部署到GitHub Pages。

### 部署步骤：

1. **推送代码到main分支**
   ```bash
   git add .
   git commit -m "Update website content"
   git push origin main
   ```

2. **GitHub Actions会自动执行以下步骤：**
   - 安装Node.js依赖
   - 构建Astro项目
   - 部署到GitHub Pages

3. **访问你的网站**
   - 网站地址：`https://luka2chat.github.io`
   - 部署完成后，GitHub会显示部署状态

### 手动部署（可选）

如果你想在本地测试构建：

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 预览构建结果
npm run preview
```

### 配置说明

- **构建输出目录**: `dist/`
- **GitHub Pages源**: GitHub Actions
- **分支**: `main`
- **域名**: `luka2chat.github.io`

### 故障排除

1. **构建失败**
   - 检查GitHub Actions日志
   - 确保所有依赖都正确安装
   - 验证Astro配置是否正确

2. **页面显示404**
   - 确保`astro.config.ts`中的`base`路径正确
   - 检查GitHub Pages设置是否正确

3. **样式问题**
   - 确保Tailwind CSS正确构建
   - 检查静态资源路径

### 更新网站内容

1. 修改`src/`目录下的文件
2. 提交并推送到GitHub
3. GitHub Actions会自动重新部署

### 自定义域名（可选）

如果你想使用自定义域名：

1. 在GitHub仓库设置中配置自定义域名
2. 更新`astro.config.ts`中的`site`配置
3. 更新`src/config.yaml`中的站点配置 