import { format, parseISO } from 'date-fns';

export default function eventConvertDatetime (sourceDatestring) {
    if(sourceDatestring){
      const date = format(parseISO(sourceDatestring), "MMMM do, yyyy hh:mm a");
      return date; 
    }
  };