# 类型操作

## 泛型

::: info 主要内容
- 泛型定义

:::

### 定义

泛型（Generics）是指在定义函数、接口或类时不预先指定具体的类型，而是在使用时再指定类型的一种特性。


### 泛型类型变量

```typescript
function identity<T>(arg: T): T {
    return arg;
}
```

### 泛型接口

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}
```

### 泛型类

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
```

### 泛型约束

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
       console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```
    