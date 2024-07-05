# 初始化

参考链接：<https://www.cnblogs.com/anduril/p/16326845.html>

掘金地址：<https://juejin.cn/column/7101702283628396551>

本文基于 vben 框架 v2.10 进行说明。

## 系统主入口

文件 src/main.ts 作为系统主入口，主要进行项目初始化操作。

(1) 首先引入样式文件

```ts
import "uno.css";
import "@/design/index.less";
import "@/components/VxeTable/src/css/index.scss";
import "ant-design-vue/dist/antd.less";
// Register icon sprite
import "virtual:svg-icons-register";
```

(2) 接下来执行 bootstrap 方法创建项目实列。

```ts
import { createApp } from "vue";
import { registerGlobComp } from "@/components/registerGlobComp";
import { setupGlobDirectives } from "@/directives";
import { setupI18n } from "@/locales/setupI18n";
import { setupErrorHandle } from "@/logics/error-handle";
import { initAppConfigStore } from "@/logics/initAppConfig";
import { router, setupRouter } from "@/router";
import { setupRouterGuard } from "@/router/guard";
import { setupStore } from "@/store";
import App from "./App.vue";

async function bootstrap() {
  const app = createApp(App);

  // 配置 store - 全局共享状态
  setupStore(app);
  // 初始化内部系统配置
  initAppConfigStore();
  // 注册全局组件
  registerGlobComp(app);
  // 多语言配置
  await setupI18n(app);
  // 配置路由
  setupRouter(app);
  // 路由守卫
  setupRouterGuard(router);
  // 注册全局指令 - 权限相关
  setupGlobDirectives(app);
  // 配置全局错误处理
  setupErrorHandle(app);

  app.mount("#app");
}

bootstrap();
```

bootstrap() 执行时调用了很多方法用于初始化操作，包括配置存储、加载系统配置注册、注册全局组件、多语言配置、路由配置、路由守卫、权限过滤、注册全局指令等。

## setupStore

项目状态管理代码实现在 src/store/ 目录下, 使用新一代的状态管理器 Pinia。

src\store\index.ts 文件中声明 setupStore 方法，用于将创建一个 pinia 根存储并注册到应用程序中。

```ts
import type { App } from "vue";
import { createPinia } from "pinia";
// 创建一个 pinia（根存储）
const store = createPinia();
// 注册到应用程序
export function setupStore(app: App<Element>) {
  app.use(store);
}

// 单独将pinia 实例导出
export { store };
```

### 状态实例

在 src/store/modules 目录下，各个文件中定义不同的 store 实例，主要用于项目配置、错误日志、国际化、锁屏、多标签、菜单路由权限、用户状态等状态管理。

```sh
├── store # 数据仓库
│   ├── index.ts
│   ├── modules
│   │   ├── app.ts #  项目配置
│   │   ├── errorLog.ts # 错误日志
│   │   ├── locale.ts # 国际化/多语言
│   │   ├── lock.ts # 系统锁屏
│   │   ├── multipleTab.ts # 多标签
│   │   ├── permission.ts # 权限/菜单/路由
│   │   └── user.ts # 用户状态
```

### 项目配置：app.ts

::: info 主要内容

- data
- getter
- action
- 其它
  :::

文件 src\store\modules\app.ts 声明导出一个 store 实例 useAppStore 、一个方法 useAppStoreWithOut()用于没有使用 setup 组件时使用。

```ts
// 项目配置存储实例
export const useAppStore = defineStore({
  id: 'app',  // 也称为 name，是必要的，Pinia 使用它来将 store 连接到 devtools。
  state: {},
  getters: {}
  actions：{}
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}

```

(一) data

状态对象定义了主题模式、页面加载状态、项目配置、菜单状态快照等。

```ts
state: (): AppState => ({
  darkMode: undefined, // 主题模式  dark|light
  pageLoading: false, //  页面加载状态
  projectConfig: Persistent.getLocal(PROJ_CFG_KEY), // 项目配置 ProjectConfig
  beforeMiniInfo: {}, // BeforeMiniState
}),

```

- projectConfig 属性用于配置项目内展示的内容、布局、文本等效果，具体配置文件路径 src/settings/projectSetting.ts， 属性定义由于篇幅原因请直接查看官网的 项目配置说明 。
- projectConfig 的初始化值从缓存中获取，而不是从文件中引入，这个后面会有单独篇幅进行讲解。
- beforeMiniInfo 属性用于当窗口缩小时记住菜单状态，并在恢复窗口时恢复这些状态（是否折叠、是否分割、类型、模式）。

```ts
export interface BeforeMiniState {
  menuCollapsed?: boolean; // 菜单折叠
  menuSplit?: boolean; // 分割菜单
  menuMode?: MenuModeEnum; // 菜单类型
  menuType?: MenuTypeEnum; // 菜单模式
}
```

(二) Getter

Getter 等同于 Store 状态的计算值(计算属性)。

```ts
getters: {
  // 页面加载状态
  getPageLoading(): boolean {
    return this.pageLoading;
  },
  // 主题模式
  getDarkMode(): 'light' | 'dark' | string {
    return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
  },
  // 菜单状态快照
  getBeforeMiniInfo(): BeforeMiniState {
    return this.beforeMiniInfo;
  },
  // 项目配置
  getProjectConfig(): ProjectConfig {
    return this.projectConfig || ({} as ProjectConfig);
  },
  // 头部配置
  getHeaderSetting(): HeaderSetting {
    return this.getProjectConfig.headerSetting;
  },
  // 菜单配置
  getMenuSetting(): MenuSetting {
    return this.getProjectConfig.menuSetting;
  },
  // 动画配置
  getTransitionSetting(): TransitionSetting {
    return this.getProjectConfig.transitionSetting;
  },
  // 多标签配置
  getMultiTabsSetting(): MultiTabsSetting {}
    return this.getProjectConfig.multiTabsSetting;
  },
},

```

其中 getDarkMode() 根据 state.darkMode、localStorage 存储和 配置文件的定义值 darkMode 进行计算。

```ts
// src\settings\designSetting.ts
export const darkMode = ThemeEnum.LIGHT;
```

(三) Actions

Actions 相当于组件中的 methods，主要用于设置 state 对象。

```ts
actions: {
  // 设置页面加载状态
  setPageLoading(loading: boolean): void {
    this.pageLoading = loading;
  },
  // 设置主题模式 存于`localStorage`中
  setDarkMode(mode: ThemeEnum): void {
    this.darkMode = mode;
    localStorage.setItem(APP_DARK_MODE_KEY_, mode);
  },
  // 设置页面加载状态
  setBeforeMiniInfo(state: BeforeMiniState): void {
    this.beforeMiniInfo = state;
  },
  // 设置项目配置 项目自带的缓存类进行缓存操作
  setProjectConfig(config: DeepPartial<ProjectConfig>): void {
    this.projectConfig = deepMerge(this.projectConfig || {}, config);
    Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
  },
  // 重置路由
  async resetAllState() {
    resetRouter();
    Persistent.clearAll(); // 清空缓存
  },
  // 使用定时器设置页面加载状态
  async setPageLoadingAction(loading: boolean): Promise<void> {
    if (loading) {
      clearTimeout(timeId);
      // Prevent flicker  防止闪烁
      timeId = setTimeout(() => {
        this.setPageLoading(loading);
      }, 50);
    } else {
      this.setPageLoading(loading);
      clearTimeout(timeId);
    }
  },
},

```

（四） 其它

在缓存、localStorage 操作中使用了存储 KEY，它定义在 src\enums\cacheEnum.ts 文件中。

```ts
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from "/@/enums/cacheEnum";

// src\enums\cacheEnum.ts
export const APP_DARK_MODE_KEY_ = "__APP__DARK__MODE__";
export const APP_LOCAL_CACHE_KEY = "COMMON__LOCAL__KEY__";
```

### 错误日志：rrorLog.ts

## initAppConfigStore

src\logics\initAppConfig.ts 文件中声明 initAppConfigStore 方法，用于加载并存储 国际化、主题风格、项目配置、页面加载、页面状态、顶栏配置、菜单配置等项目信息。

```TypeScript
export function initAppConfigStore() {
  const localeStore = useLocaleStore(); // 多语言国际化
  const appStore = useAppStore();       // 应用状态(主题风格、项目配置、页面加载、页面状态等等)
  // 项目配置 (主题颜色、主题模式、顶栏配置、菜单配置)
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  ...

  // 存储项目配置
  appStore.setProjectConfig(projCfg);

  // init dark mode 初始化暗黑模式
  updateDarkTheme(darkMode);
  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor();
    updateSidebarBgColor();
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
  }
  // init store 初始化国际化多语言
  localeStore.initLocale();

  // 清理过期的缓存
  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}
```

## registerGlobComp

src\components\registerGlobComp.ts 文件中声明 registerGlobComp 方法,全局注册 antdv 的 Input、Layout 组件和手写的 Button 组件、VXETable 表格组件

```ts
import type { App } from "vue";
import { Button } from "./Button";
import { Input, Layout } from "ant-design-vue";
import VXETable from "vxe-table";

export function registerGlobComp(app: App) {
  // 注册 antdv的Input、Layout组件和手写的Button组件、表格组件
  app.use(Input).use(Button).use(Layout).use(VXETable);
}
```

## setupI18n

src\locales\setupI18n.ts 文件中声明 setupI18n 方法,初始化国际化插件 vue-i18n 实例并注册到应用程序中。

```ts
// 国际化插件 vue-i18n 配置项
async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithOut(); // 国际化本地存储
  const locale = localeStore.getLocale; // 语言环境/当前语言
  const defaultLocal = await import(`./lang/${locale}.ts`); // 从服务器端获取语言翻译文件
  const message = defaultLocal.default?.message ?? {}; // 本地化的语言环境信息

  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });

  return {
    legacy: false,
    locale, // 语言环境
    fallbackLocale: fallback, // 预设的语言环境
    // 本地化的语言环境信息
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales, // 以词法顺序排列的 messages 中的可用语言环境列表
    sync: true, // 是否将根级别语言环境与组件本地化语言环境同步。 如果为 false，则无论根级别语言环境如何，都要为每个组件语言环境进行本地化。
    silentTranslationWarn: true, // true - warning off  是否取消本地化失败时输出的警告。如果为 true，则禁止本地化失败警告。
    missingWarn: false,
    silentFallbackWarn: true, // 是否在回退到 fallbackLocale 或 root 时取消警告。如果为 true，则仅在根本没有可用的转换时生成警告，而不是在回退时。
  };
}

// 初始化国际化实例
export async function setupI18n(app: App) {
  // 获取国际化插件 vue-i18n 配置项
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}
```

## setupRouter

src\router\index.ts 文件中声明 setupRouter 方法,创建路由实例,加载初始路由列表，注册到应用程序中。

```TypeScript
// app router  创建路由实例
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH), // 基于 hash 的历史记录
  routes: basicRoutes as unknown as RouteRecordRaw[], // 添加到路由的初始路由列表
  scrollBehavior: () => ({ left: 0, top: 0 }), // 在页面之间导航时控制滚动的函数
});

// 注册路由
export function setupRouter(app: App<Element>) {
  app.use(router);
}
```

## setupRouterGuard

src\router\guard\index.ts 文件中声明 setupRouterGuard 方法,创建了处理页面加载状态、路由切换、页面顶部进度条、权限验证、菜单及系统状态等守卫。

```ts
export function setupRouterGuard(router: Router) {
  createPageGuard(router); // 处理页面状态
  createPageLoadingGuard(router); // 处理页面加载状态
  createHttpGuard(router); // 路由切换时关闭当前页面完成请求
  createScrollGuard(router); // 路由切换回到顶部
  createMessageGuard(router); // 路由切换时关闭消息实例
  createProgressGuard(router); // 页面顶部进度条
  createPermissionGuard(router); // 路由切换时权限验证
  createParamMenuGuard(router); // 菜单守卫
  createStateGuard(router); // 系统状态守卫- 当用户未登录时，进入登录页面并清除存储中的认证信息
}
```

## setupGlobDirectives

src\directives\index.ts 文件中声明 setupGlobDirectives 方法,创建全局指令。

```ts
export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
  setupLoadingDirective(app);
  setupEllipsisDirective(app);
}
```

## setupErrorHandle

src\logics\error-handle\index.ts 文件中声明 setupErrorHandle 方法,配置全局错误处理，用于监控 Vue 异常、脚本错误、promise 异常、 静态资源异常等。

```ts
export function setupErrorHandle(app: App) {
  const { useErrorHandle } = projectSetting;
  if (!useErrorHandle) {
    return;
  }
  // Vue exception monitoring; Vue异常监控
  app.config.errorHandler = vueErrorHandler;

  // script error   脚本错误监控
  window.onerror = scriptErrorHandler;

  //  promise exception  promise 异常监控
  registerPromiseErrorHandler();

  // Static resource exception  静态资源异常监控
  registerResourceErrorHandler();
}
```
