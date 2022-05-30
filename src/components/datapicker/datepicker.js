import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const Datepicker = (props) => {
  return (
    <div>
      <DateRangePicker
        onChange={(value) => {
          if (value !== null) {
            var date1 = new Date(value[0]);
            date1.setDate(date1.getDate() + 1);
            var date2 = new Date(value[1]);
            var d1 = date1.toISOString().split("T")[0];
            var d2 = date2.toISOString().split("T")[0];
            props.setDate([d1, d2]);
          } else {
            props.setDate([new Date(), new Date()]);
            var date1 = new Date();
            // date1.setDate(date1.getDate() + 1);
            var date2 = new Date();
            var d1 = date1.toISOString().split("T")[0];
            var d2 = date2.toISOString().split("T")[0];
            props.setDate([d1, d2]);
          }
        }}
        value={[new Date(props.date[0]), new Date(props.date[1])]}
        showLeadingZeros={true}
        dayPlaceholder={"dd"}
        monthPlaceholder={"mm"}
        yearPlaceholder={"yyyy"}
      />
    </div>
  );
};

export default Datepicker;
