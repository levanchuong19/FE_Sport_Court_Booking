// function formatDate(date: Date): string {
//     const formatter = new Intl.DateTimeFormat('vi-VN', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//     });
//     return formatter.format(date);
// }

// export default formatDate;

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function formatDate(date: Date): string {
  return dayjs.utc(date).format("DD/MM/YYYY");
}

export default formatDate;