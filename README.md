# Простой генератор графиков из шрифта Брайля

## Примеры применения
```tsx
<BrailleChart values={values} height={10} />
```    
### Чёрно-белый график  
![bw_1](./docs/static/bw_1.png)    

---

```tsx
<BrailleChart values={values} height={10} colormatic={true} />
```  
### Цветной график  
![color_1](./docs/static/color_1.png)    

---

```tsx
<BrailleChart values={values} height={30} colormatic={true} />
```  
### Изменение высоты графика (в символах)  
![big_1](./docs/static/big_1.png)    

---

```tsx
<BrailleChart values={values} height={10} colormatic={true} reversed={true} />
```  

### Перевёрнутый график  
![reversed_1](./docs/static/reversed_1.png)   

---

```tsx
<BrailleChart values={values} height={10} colormatic={true} reversed={false} />
<BrailleChart values={values} height={10} colormatic={true} reversed={true} />
```  
### Комбинированное использование  
![combine_1](./docs/static/combine_1.png)     

---
**by AndcoolSystems, August 22, 2024**