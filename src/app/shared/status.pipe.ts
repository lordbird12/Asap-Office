import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({
  name: "ChangeStatus",
  standalone: true
})
export class ChangeStatusPipe implements PipeTransform {
  status = [
    { key: "New", value: "งานใหม่" },
    { key: "Process", value: "กำลังดำเนินงาน" },
    { key: "Waiting", value: "รอเข้ารับบริการ" },
    { key: "Finish", value: "เสร็จสิ้น" },
    { key: "Cancel", value: "ยกเลิก" },
  ];

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(1111)
    const text = this.status.find((s) => s.key == value);
    return text ? text.value : value;
  }
}
