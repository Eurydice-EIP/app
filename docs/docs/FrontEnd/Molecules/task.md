# Task

## Props

```
type TaskProps = {
  className?: string;
  task?: string;
  description?: string;
  xp?: number;
  money?: number;
};
```

**className** : The tailwind style of the box containing the task.

**task** : The name of the task.

**description** : The description of the task.

**xp** : The number of XP gained upon completing the task.

**money** : The amount of money gained upon completing the task.

---

## Example

```
<Task
    className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
    task="Drink a plant"
    description="Be water"
    xp={15}
    money={5}
></Task>
```
