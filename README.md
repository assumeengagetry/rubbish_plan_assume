# University Schedule App (Tauri v2 + React)

这是一个基于 **Tauri v2**、**React**、**TypeScript** 和 **Tailwind CSS** 构建的移动端课表应用。

本文档详细介绍了如何配置开发环境并将项目编译打包为 Android APK。

---

## 1. 环境准备 (Prerequisites)

在开始之前，您必须安装以下基础环境。这是最关键的一步，请仔细检查。

### 1.1 安装基础工具
1.  **Node.js**: 建议版本 v18 或更高。
2.  **Rust**: 运行以下命令安装 Rust (如果未安装)：
    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```
3.  **Android Studio**: 下载并安装 [Android Studio](https://developer.android.com/studio)。

### 1.2 配置 Android SDK 和 NDK
打开 Android Studio，进入 **Settings** -> **Languages & Frameworks** -> **Android SDK** (或者在欢迎界面点击 "More Actions" -> "SDK Manager")。

1.  **SDK Platforms 标签页**:
    *   勾选 **Android 13 (Tiramisu)** 或 **Android 14** (API Level 33/34)。
2.  **SDK Tools 标签页** (勾选 "Show Package Details"):
    *   **Android SDK Build-Tools**: 勾选一个较新的版本 (如 34.0.0)。
    *   **NDK (Side by side)**: 勾选一个版本 (推荐 26.x 或 25.x)。
    *   **Android SDK Command-line Tools (latest)**: 必须勾选。
    *   **CMake**: 勾选。

### 1.3 配置环境变量
你需要设置 `JAVA_HOME` 和 `ANDROID_HOME`。

**Windows (PowerShell):**
```powershell
$env:JAVA_HOME="C:\Program Files\Android\Android Studio\jbr" # 路径可能不同，请检查
$env:ANDROID_HOME="$env:LOCALAPPDATA\Android\Sdk"
$env:NDK_HOME="$env:ANDROID_HOME\ndk\<你的NDK版本号>"
```

**Mac/Linux (.zshrc 或 .bashrc):**
```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" # Mac 示例
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_HOME="$ANDROID_HOME/ndk/<你的NDK版本号>"
export PATH="$ANDROID_HOME/platform-tools:$PATH"
```

---

## 2. 项目初始化

### 2.1 安装依赖
在项目根目录下运行：

```bash
npm install
npm install -D @tauri-apps/cli
```

### 2.2 初始化 Android 项目
运行以下命令，Tauri 会根据 `src-tauri/tauri.conf.json` 自动生成 Android 原生工程文件（位于 `src-tauri/gen/android`）。

```bash
npx tauri android init
```
*如果提示缺少 Rust targets，请根据提示运行 `rustup target add ...` 命令。*

---

## 3. 开发与调试 (可选)

如果你连接了安卓手机（已开启 USB 调试）或者启动了 Android 模拟器，可以运行以下命令进行实时调试：

```bash
npx tauri android dev
```
这将编译 App 并自动安装到手机上，支持热更新。

---

## 4. 打包 APK (Build APK)

### 4.1 通用打包 (Debug/Unsigned)
如果只是自己测试安装，不需要发布到 Google Play，运行：

```bash
npx tauri android build
```
或者指定 APK 格式：
```bash
npx tauri android build --apk
```

**编译成功后，APK 文件位于：**
`src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk`

*(注：生成的可能是 unsigned 包，部分手机可能需要开启“允许安装未知来源”且无需签名，或者你可以使用 debug 模式打包)*

若要生成 Debug 包（自带签名，方便直接安装）：
```bash
npx tauri android build --debug
```
**Debug APK 位置：**
`src-tauri/gen/android/app/build/outputs/apk/universal/debug/app-universal-debug.apk`

---

## 5. 常见问题 (Troubleshooting)

**Q: 报错 `SDK location not found`?**
A: 确保 `ANDROID_HOME` 环境变量已正确设置。

**Q: 报错 `NDK not found`?**
A: 确保在 Android Studio SDK Tools 中下载了 NDK，并设置了 `NDK_HOME` 环境变量。

**Q: 界面白屏?**
A: 确保你的手机和电脑在同一局域网（如果是 `dev` 模式）。如果是 `build` 模式，确保前端代码没有报错。

**Q: 图标不显示?**
A: 确保 `src-tauri/icons` 文件夹下存在 `icon.png` 等资源，并且 `tauri.conf.json` 配置正确。

---

## 6. 代码结构说明

*   **src/**: React 前端代码。
*   **src-tauri/**: Tauri 后端及配置。
    *   `src-tauri/gen/android`: 自动生成的 Android 原生代码 (Gradle 项目)。
    *   `tauri.conf.json`: 项目核心配置 (包名、图标、权限)。
    *   `capabilities/`: 移动端权限配置。
