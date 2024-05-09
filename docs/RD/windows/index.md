# windows

### 批量重命名文件

```bash
Get-ChildItem -Path "D:\project\chike\docs" -Filter "README.md" -Recurse | Rename-Item -NewName { $_.Name -replace 'README.md','index.md' }
```

这个 PowerShell 命令使用 Get-ChildItem 在指定目录中递归查找所有 README.md 文件，并使用 Rename-Item 将它们重命名为 index.md。

### 创建文件

```bash
echo. > filename.txt
```
