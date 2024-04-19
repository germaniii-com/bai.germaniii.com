import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(tz);

export const getDateFromISO = (inputISOString, isChatBubble) => {
  const dayjsUTC = dayjs.utc(inputISOString);
  const dateOnly = dayjsUTC.local().format("MM-DD");
  const timeOnly = dayjsUTC.local().format("HH:mm");
  const dateTime = dayjsUTC.local().format("MM-DD HH:mm");

  const currentISOString = dayjs();
  const isToday = dayjs(inputISOString).isSame(currentISOString, "day");

  const chatBubbleDateTime = isToday ? `${timeOnly}` : `${dateTime}`;
  const conversationListDateTime = isToday ? `${timeOnly}` : `${dateOnly}`;

  return isChatBubble ? chatBubbleDateTime : conversationListDateTime;
};
