# Timeline Item

## Props

```
type TimelineItemProps = {
  className?: string;
  event?: string;
  time?: string;
};
```

**className** : The tailwind style of the box containing the event.

**event** : The name of the event.

**time** : The beginning and end time of the event.

---

## Example

```
<TimelineItem
    className="rounded-xl p-4 bg-[#F4F7F8] border-[#B0E0E6] border-2"
    event="Meeting"
    time="8h - 9h"
></TimelineItem>
```
