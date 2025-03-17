# Timeline

## Props

```
type TimelineProps = {
  children?: React.ReactNode;
  className?: string;
};
```

**children** : All the [Timeline Items](../Molecules/timeline_item.md) contained by the Timeline.

**className** : The tailwind style of the Timeline Line.

---

## Example

```
<Timeline
  className="relative border-s border-gray-200 dark:border-gray-700">
  <TimelineItem
    className="rounded-xl p-4 bg-[#F4F7F8] border-[#B0E0E6] border-2"
    event="Meeting"
    time="8h - 9h"
  ></TimelineItem>
  <TimelineItem
    className="rounded-xl p-4 bg-[#F4F7F8] border-[#B0E0E6] border-2"
    event="Cook tartiflette"
    time="12h - 14h30"
  ></TimelineItem>
</Timeline>
```
