import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = (props) => {
    let pomoData;
    if (props.pomoData) {
      pomoData = props.pomoData
    } else {
      pomoData = {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0
      }
    }
    const order = {Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7,};


    function generateData(data) {
        //create a point of data for each key
        const chartData = []
        for (const [key, value] of Object.entries(data)) {
            let day = {
                day: key
            }
            for (const [innerkey, innervalue] of Object.entries(value)) {
                day[innerkey] = innervalue
            }
        chartData.push(day)
        }
        return chartData.sort(function (a, b) {
            return order[a.day] - order[b.day];
          });
    }


    const hexColorArr = [
      "#ea844a",
      "#36ef7a",
      "#9e6fee",
      "#f12c86",
      "#7af12c",
      "#b0d0d3",
      "#c08497",
      "#f7af9d",
      "#f7e3af",
      "#f3eec3"
    ];

    const generateBar = (sortedArray) => {
      const tempCategoryArray = []

      //grab all categories for data
      sortedArray.map((dataObj) =>
        Object.keys(dataObj)
          .filter((propName) => {
            return propName !== "day";
          })
          .map((category) => {
            tempCategoryArray.push(category)
          })
      );

      //remove duplicate categories
      const categoryArray = tempCategoryArray.filter(function(item, pos){
        return tempCategoryArray.indexOf(item) == pos; 
      });

      //create bar per category
      const barArray = categoryArray.map((category, index) => {
        return (
          <Bar
              dataKey={category}
              stackId="thisIsMyStackId"
              fill={hexColorArr[index]}
              name={category}
            />
        )
      })
      return barArray;
    };


    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={generateData(pomoData)}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {generateBar(generateData(pomoData))}
        </BarChart>
      </ResponsiveContainer>
    );
}

export default Chart