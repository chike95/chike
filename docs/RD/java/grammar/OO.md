# 面向对象

## 对象与类

万事万物皆对象

对象：具体的示例

类：对象的抽象和共性

- 特性 - 属性 - 名词

- 行为 - 方法 - 动词

```java
/*
* 人类
* */
public class Person {
    String name; // 姓名
    int age; // 年龄

    public void study(){
        System.out.println(this.name + " 爱学习");
    }
}
```

```java
public class testPerson {
    public static void main(String[] args) {
        Person p1 = new Person();
        p1.name = "lxm";
        p1.age = 20;
        p1.study();
    }
}
```

## 构造器

类：属性 + 方法 + 构造器

构造方法也叫构造器，是一个创建对象时被自动调用的特殊方法，用于对象的初始化。

Java 通过 new 关键字来调用构造器，从而返回该类的实例。

空构造器

![alt text](img/image-5.png)

```java
public class Person {
    public Person(){
        System.out.println("空构造器");
    }
    public Person(String a, int b){
        name = a;
        age = b;
    }

    String name; // 姓名
    int age; // 年龄

    public void study(){
        System.out.println(this.name + " 爱学习");
    }
}

```

```java
public class testPerson {
    public static void main(String[] args) {
        Person p1 = new Person();
        p1.age = 20;
        p1.name = "lxm";
        p1.study();

        Person p2 = new Person("chike", 22);
        p2.study();
    }
}

```

this

![alt text](img/image-6.png)

快捷键：Alt + insert ——> constructor -> 选择参数

![alt text](img/image-7.png)

## 封装

![alt text](img/image-8.png)

```java
public class Girl {
    private int age;

    public void setAge(int age){
        this.age = age;
    }
    public int getAge(){
        return age;
    }
}

```

```java
public class Test {
    public static void main(String[] args) {
        Girl g = new Girl();
        g.setAge(33);
        System.out.println(g.getAge());
    }
}
```

![alt text](img/image-9.png)

## 继承

继承是对类的抽象

![alt text](img/image-10.png)

父类

```java
public class Person {
    private String name;
    private int age;

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }

    public void eat(){
        System.out.println("eat");
    }
}

```

子类

```java
public class Student extends Person {
    private int sno; // 学号

    public void study(){
        System.out.println("学生要学习");
    }
}

```

调用

```java
public class Test {
    public static void main(String[] args) {
        Student s = new Student();
        s.setName("lxm");
        s.setAge(18);
        s.eat();
        s.study();
    }
}
```

### 方法重写

![alt text](img/image-11.png)

```java
// 父类 Animal
class Animal {
    // 父类方法 eat
    public void eat() {
        System.out.println("动物正在吃食物");
    }
}

// 子类 Dog 继承自父类 Animal
class Dog extends Animal {
    // 子类重写父类方法 eat
    @Override
    public void eat() {
        System.out.println("狗正在啃骨头");
    }
}

// 子类 Cat 继承自父类 Animal
class Cat extends Animal {
    // 子类重写父类方法 eat
    @Override
    public void eat() {
        System.out.println("猫正在吃鱼");
    }
}

// 主类 Main
public class Main {
    public static void main(String[] args) {
        Animal animal1 = new Dog(); // 创建一个 Dog 对象
        Animal animal2 = new Cat(); // 创建一个 Cat 对象

        animal1.eat(); // 调用 Dog 对象的 eat 方法，输出：狗正在啃骨头
        animal2.eat(); // 调用 Cat 对象的 eat 方法，输出：猫正在吃鱼
    }
}

```

## 多态

多态：通俗来说，就是多种形态，具体点就是去完成某个行为，当不同的对象去完成时会产生出不同的状态。同一种行为，不同的子类呈现出来的状态是不同的。

PS：多态跟属性无关，多态指的是方法的多态，而不是属性的多态。

```java
// 父类 Animal
class Animal {
    // 父类方法 makeSound
    public void makeSound() {
        System.out.println("动物发出声音");
    }
}

// 子类 Dog 继承自父类 Animal
class Dog extends Animal {
    // 子类重写父类方法 makeSound
    @Override
    public void makeSound() {
        System.out.println("狗在汪汪叫");
    }
}

// 子类 Cat 继承自父类 Animal
class Cat extends Animal {
    // 子类重写父类方法 makeSound
    @Override
    public void makeSound() {
        System.out.println("猫在喵喵叫");
    }
}

// 主类 Main
public class Main {
    public static void main(String[] args) {
        Animal animal1 = new Dog(); // 创建一个 Dog 对象并赋值给 Animal 类型的引用
        Animal animal2 = new Cat(); // 创建一个 Cat 对象并赋值给 Animal 类型的引用

        animal1.makeSound(); // 调用 Dog 对象的 makeSound 方法，输出：狗在汪汪叫
        animal2.makeSound(); // 调用 Cat 对象的 makeSound 方法，输出：猫在喵喵叫
    }
}

```

![alt text](img/image-12.png)

多态的三要素:继承、重写、父类引用指向子类对象

多态的好处:提高代码扩展性


## 异常处理

### try-catch-finally

![alt text](img/image-13.png)

```java
public class Test {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        int c = 0;
        try {
            c = a / b;
        } catch (ArithmeticException e) {
            System.out.println("除数不能为0");
        } finally {
            System.out.println("finally");
            // 无论是否发生异常，都会执行finally语句块
        }
        System.out.println(c);
    }
}

```

### throw/throws

throw 用于在代码块中抛出异常，而 throws 用于声明一个方法可能抛出的异常。

![alt text](img/image-14.png)



```java
// 使用 throw 抛出异常
public class ThrowExample {
    public static void main(String[] args) {
        int age = 17;
        try {
            if (age < 18) {
                throw new ArithmeticException("未满18岁，不允许注册。");
            } else {
                System.out.println("注册成功！");
            }
        } catch (ArithmeticException e) {
            System.out.println("发生异常：" + e.getMessage());
        }
    }
}

 ```

 ```java
// 使用 throws 声明方法可能抛出的异常
import java.io.FileNotFoundException;
import java.io.FileReader;

public class ThrowsExample {
    public static void main(String[] args) {
        try {
            readDataFromFile();
        } catch (FileNotFoundException e) {
            System.out.println("发生文件未找到异常：" + e.getMessage());
        }
    }

    public static void readDataFromFile() throws FileNotFoundException {
        FileReader fileReader = new FileReader("test.txt");
        // 读取文件内容
    }
}
 ```
     
## 集合

![alt text](img/image-15.png)

![alt text](img/image-16.png)

### ArrayList


```java
import java.util.ArrayList;
public class Main {
    public static void main(String[] args) {
        // 创建一个整数类型的 ArrayList
        ArrayList<Integer> numbers = new ArrayList<>();

        // 添加元素
        numbers.add(5);
        numbers.add(10);
        numbers.add(15);

        // 获取元素
        System.out.println("第二个元素是：" + numbers.get(1));

        // 遍历元素
        for (Integer number : numbers) {
            System.out.println(number);
        }
        // 修改元素
        numbers.set(2, 20);
        System.out.println("修改后的 ArrayList：" + numbers);

        // 删除元素
        numbers.remove(0);
        System.out.println("删除第一个元素后：" + numbers);

        // 获取元素个数
        System.out.println("ArrayList 中有 " + numbers.size() + " 个元素");

        // 检查是否包含某个元素
        System.out.println("ArrayList 是否包含 10：" + numbers.contains(10));

        // 清空 ArrayList
        numbers.clear();
        System.out.println("清空后的 ArrayList：" + numbers);
    }
}
```

```bash
第二个元素是：10
5
10
15
修改后的 ArrayList：[5, 10, 20]
删除第一个元素后：[10, 20]
ArrayList 中有 2 个元素
ArrayList 是否包含 10：true
清空后的 ArrayList：[]
```