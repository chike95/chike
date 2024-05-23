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

### 进程管理

在 Windows 中查看指定端口的进程可以使用命令行工具 netstat

打开命令提示符（按 Win+R 键，输入 cmd 并回车）。

在命令提示符窗口中输入以下命令：

```bash
netstat -ano | findstr :9003
```

此时会显示使用 9003 端口的进程信息，包括 PID（进程标识符）。PID 可以用于终止该进程。

```bash
TCP    0.0.0.0:9003           0.0.0.0:0              LISTENING       1688
TCP    [::]:9003              [::]:0                 LISTENING       1688
```

如果要终止使用该端口的进程，可以使用任务管理器或者命令行工具 taskkill。例如，要终止 PID 为 1688 的进程，可以使用以下命令：

```bash
taskkill /pid 1688 /f
```
