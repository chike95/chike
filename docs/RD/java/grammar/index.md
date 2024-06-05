# JAVA 基础语法

### 注释

为了增加程序的可读性，方便代码的阅读，可以在程序中加入一些解释性的文字，异或可以将程序中无用的语句屏蔽掉，此时就需要一个很关键的
技能点 —— 注释

```java
// 单行注释

/*
多行注释
*/

/**
 * 文档注释
**/
```

## 变量/常量

变量本质上就是代表一个 “可操作的存储空间” 空间位置是确定的，但是里面放置什么值不确定。我们可通过变量名来访问“对应的存储空间”，从而操纵这个“存储空间”存储的值。Java 是一种强类型语言，每个变量都必须声明其数据类型。变量的数据类型决定了变量占据存储空间的大小。

- 声明：类型 + 名字
- 变量不可以重复定义

```java
package com.lxm.test1;

public class HelloWorld {
    public static void main(String[] args) {
        // 1 声明
        int age;
        // 2 赋值
        age = 18;
        // 3 使用
        System.out.println(age);
    }
}
```

变量的内存

## 数据类型

![alt text](img/image.png)

### 整数类型

- byte 1 个字节 （-128 ~ 127）
- short 2 个字节 （±30000）
- int 4 个字节 （±21 亿）
- long 8 个字节 （±9223372036854775807）

注意事项

- 整数类型默认是 int 类型
- 整数类型可以自动转换为范围小的整数类型
- 整数类型不可以自动转换为范围大的整数类型
- 整数类型不可以自动转换为范围小的浮点数类型
- 整数类型不可以自动转换为范围大的浮点数类型

### 浮点类型

- float 4 个字节
- double 8 个字节

```java
float f = 3.14f;
double d = 3.14;
```

### 字符类型

- char 2 个字节

```java
char c = 'a';
```

### 布尔类型

- boolean 1 个字节

```java
boolean flag = true;
```

## 运算符

![alt text](img/image-1.png)

![alt text](img/image-2.png)

### 加号

- 表示正数
- 表示相加操作
- 字符串拼接

::: warning 注意事项

字符串拼接时，如果其中有一个字符串是变量，那么这个变量会自动转换为字符串类型，然后进行拼接。

:::

![alt text](img/image-4.png)

### 自增/自减

- 自增：++
- 自减：--

```java
int a = 10;
int b = ++a; // 11
int c = a++; // 11
int d = --a; // 10
int e = a--; // 10
```

区分 ++ 在左 与 在右的区别

### 赋值运算符

- 赋值运算符 =
- 复合赋值运算符 += -= \*= /= %=

```java
int a = 10;
```

### 关系运算符

```bash
 >
 <
 > =
 <=
 ==
 !=
```

```java
int a = 10;
int b = 20;
System.out.println(a > b); // false
```

### 逻辑运算符

- && 与
- || 或
- ! 非

```java
int a = 10;
int b = 20;
System.out.println(a > b && b > a); // false
```

### 位运算符

- &
- |
- ~
- ^
- <<
- > >

```java
int a = 10;
int b = 20;
System.out.println(a & b); // 10
```

### 运算符优先级

## 流程控制

流程控制语句是用来控制程序中各语句执行顺序的语句，可以把语句组合成能完成一定功能的小逻辑模块。

### 顺序结构

- 程序从上到下依次执行

### 分支结构

- 单/双分支：if

```bash
int num = -5;

// 单分支
if(num > 0){
    System.out.println("num 是正数");
}

// 双分支
if(num > 0){
    System.out.println("num 是正数");
} else {
    System.out.println("num 是负数或零");
}

// 多分支
if (num > 0) {
    System.out.println("num是正数");
} else if (num < 0) {
    System.out.println("num是负数");
} else {
    System.out.println("num是零");
}
```

- 多分支：switch

```bash
int day = 3;
String dayName;

switch (day) {
    case 1:
        dayName = "星期一";
        break;
    case 2:
        dayName = "星期二";
        break;
    case 3:
        dayName = "星期三";
        break;
    case 4:
        dayName = "星期四";
        break;
    case 5:
        dayName = "星期五";
        break;
    case 6:
        dayName = "星期六";
        break;
    case 7:
        dayName = "星期日";
        break;
    default:
        dayName = "无效的天数";
        break;
}

System.out.println("今天是" + dayName);

```

### 循环结构

- 条件初始化
- 条件判断
- 循环体
- 迭代

while

```java
int count = 0;

while (count < 5) {
    System.out.println("Count: " + count);
    count++;
}
```

for

```java
// 使用for循环打印数字1到5：
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}

// 使用for循环迭代遍历数组：
int[] numbers = {1, 2, 3, 4, 5};

for (int i = 0; i < numbers.length; i++) {
    System.out.println("Number " + (i+1) + ": " + numbers[i]);
}

// 使用for-each循环迭代遍历集合元素：
List<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Orange");

for (String fruit : fruits) {
    System.out.println(fruit);
}

```

## 方法

方法是用于执行特定任务的一段代码。它们允许你将代码块组织成可重复使用的单元。

```java
public class Example {
    // 定义一个方法，用于打印Hello World
    public static void printHelloWorld() {
        System.out.println("Hello, World!");
    }

    // 主方法，程序的入口
    public static void main(String[] args) {
        // 调用printHelloWorld方法
        printHelloWorld();
    }
}
```

### 方法重载

```java
public class MathUtil {
    // 方法重载：计算两个整数的和
    public int add(int a, int b) {
        return a + b;
    }

    // 方法重载：计算三个整数的和
    public int add(int a, int b, int c) {
        return a + b + c;
    }

    // 方法重载：计算两个浮点数的和
    public double add(double a, double b) {
        return a + b;
    }

    // 主方法，程序的入口
    public static void main(String[] args) {
        MathUtil math = new MathUtil();

        System.out.println(math.add(2, 3)); // 输出 5
        System.out.println(math.add(2, 3, 4)); // 输出 9
        System.out.println(math.add(2.5, 3.7)); // 输出 6.2
    }
}

```

方法重载的要求如下：

- 方法名称必须相同：在同一个类中，重载的方法必须具有相同的名称。

- 参数列表必须不同：重载的方法必须具有不同的参数列表，这可以通过参数的数量、类型或者顺序来实现区分。

- 返回类型可以相同也可以不同：重载的方法可以具有相同的返回类型，也可以具有不同的返回类型。但是仅仅通过返回类型的不同是不能构成方法的重载的，因为 Java 编译器不允许仅根据返回类型来区分重载的方法。

- 访问修饰符可以相同也可以不同：重载的方法可以具有相同的或不同的访问修饰符（比如 public、private、protected、default），只要满足其他重载的要求即可。

## 数组

```java
public class ArrayDemo {
    public static void main(String[] args) {
        // 声明和初始化一个整型数组
        int[] numbers = new int[5];

        // 向数组赋值
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        numbers[3] = 40;
        numbers[4] = 50;

        // 访问数组元素并打印输出
        System.out.println("第三个元素是：" + numbers[2]); // 输出 30

        // 使用循环遍历数组并打印输出
        System.out.print("数组元素分别是：");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + " ");
        }
        System.out.println();

        // 声明和初始化一个字符串数组
        String[] names = {"Alice", "Bob", "Charlie", "David"};

        // 使用增强型for循环遍历数组并打印输出
        System.out.print("名字列表：");
        for (String name : names) {
            System.out.print(name + " ");
        }
        System.out.println();
    }
}

```
