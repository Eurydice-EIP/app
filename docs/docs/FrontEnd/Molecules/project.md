# Project

## Props

```
type ProjectProps = {
  className?: string;
  project?: string;
  xp?: number;
  money?: number;
  completion?: number;
};
```

**className** : The tailwind style of the box containing the project.

**project** : The name of the project.

**xp** : The number of XP gained upon completing the project.

**money** : The amount of money gained upon completing the project.

**completion** : The completion percentage (number)

---

## Example

```
<Project
    className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
    project="EIP Epitech"
    xp={2000}
    money={290}
    completion={17}
></Project>
```
