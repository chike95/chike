# 振弦应变

2021-01-12：程序修改

新增功能：添加数值稳定开关


## 变量定义

### 地址

#### serial-protocol.h -- 68行

```
#define ADDR_S1_LONG_END     (unsigned long)(ADDR_S1_LONG_START + 40)//44
```

修改：

```
#define ADDR_ENABLE_STABILIZER (unsigned long)(ADDR_S1_LONG_START + 44)
#define ADDR_S1_LONG_END     (unsigned long)(ADDR_S1_LONG_START + 44)//48
```
对比：

```
#define ADDR_ENABLE_STABILIZER (unsigned long)(ADDR_S1_LONG_START + 44)
#define ADDR_S1_LONG_END     (unsigned long)(ADDR_S1_LONG_START + 48)//52
```

### 变量名

#### data_struct.h  -- 136行 新增

```
unsigned long enable_stabilizer_flag;
```


## 主程序

### 命令解析

#### main.c  -- 916行

```c
case ADDR_ENABLE_STABILIZER:
    g_savedconfig.names.enable_stabilizer_flag = data;
    s_enable_stabilizer = !(data == 0);
```

用于处理命令中的地址为ADDR_ENABLE_STABILIZER的情况。根据命令中的数据值，将其赋值给变量g_savedconfig.names.enable_stabilizer_flag，并根据数据值的不同，更新变量s_enable_stabilizer的值。

(1)数据值为0，即表示关闭稳压器功能，那么将enable_stabilizer_flag设置为0，并将s_enable_stabilizer设置为false；

(2)如果数据值非零，即表示打开稳压器功能，那么将enable_stabilizer_flag设置为非零值，并将s_enable_stabilizer设置为true。


### 初始化变量

#### main.c  -- 85行

 bool s_enable_stabilizer;

#### main.c  -- 621行

```c
g_savedconfig.names.enable_stabilizer_flag = 0;
```


### 关闭比较
#### main 1486行
```
if(s_freq[s_current_channel%16]!=0)
        {
        if(((s_freq[s_current_channel%16]>freq_eval_s1)&&(s_freq[s_current_channel%16]-freq_eval_s1<20))||
            ((freq_eval_s1>=s_freq[s_current_channel%16])&&(freq_eval_s1-s_freq[s_current_channel%16]<20))
        || !s_enable_stabilizer)//无需判断稳定性直接设置采集结果
            { 
                    t_pwm2=0;
                    next_state =SAMPLE_STATE_END;
                    g_sample.freq_eval_c1 =( freq_eval_s1+s_freq[s_current_channel%16])/2;
                    break;
            }
        }
```

在原有的基础上增加了一个判断条件：如果s_enable_stabilizer为false，即稳压器功能被关闭，则无需进行稳定性判断，直接设置采集结果。


###

#### main 2237行
```
s_enable_stabilizer = !(para_read[3] == 0);
```
对s_enable_stabilizer变量进行赋值。它通过判断para_read数组中的第四个元素是否为0，来决定s_enable_stabilizer的值。如果第四个元素为0，则s_enable_stabilizer被赋值为false；否则，被赋值为true。这个变量可能是用来控制稳压器功能的开启或关闭。



extern u16 para_read[4];

这段代码声明了一个名为para_read的u16类型的数组，数组长度为4。使用extern关键字可以表示该数组是在其他文件中定义的全局变量，当前文件中只是对其进行声明。这样，在当前文件中就可以使用para_read数组来访问和操作它存储的数据。需要注意的是，在当前文件中使用para_read数组之前，需要在其他地方对其进行定义和初始化。