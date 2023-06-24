import styles from "../dashboard/dashboard.module.css"
import axios from "axios"
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import CanvasJSReact from "@canvasjs/react-charts";
import path from "../../images/Path.png"
import expand from "../../images/expand.png"
import back from "../../images/back.png"
import warning from "../../images/warning.png"
import uparrow from "../../images/uparrow.png"
import greenArrow from "../../images/greenArrow.png"

function Dashboard() {

  const ref = useRef()

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let CanvasJS = CanvasJSReact.CanvasJS;
    let CanvasJSChart = CanvasJSReact.CanvasJSChart;
    
    const[sales,setSales] = useState([]);
    const[shifts,setShifts] = useState([]);
    const[lowStock,setLowStock] = useState([]);
    const [bestWorst,setBestWorst] = useState([]);

    useEffect(() => {
        try
        {
            axios.get("/Dashboard/weekly-sales")
            .then((resp) => {
               setSales(resp.data);
            });
        }
        catch(e)
        {
            toast.error(e);
        }
    },[])

    useEffect(() => {
        try
        {
            axios.get("/Dashboard/shifts")
        .then((resp) => {
            setShifts(resp.data);
        })
        }
        catch(e)
        {
            toast.error(e);
        }
    },[])

    useEffect(() => {
        try
        {
            axios.get("/Dashboard/low-stock")
            .then((resp) => {
               setLowStock(resp.data);
            });
        }
        catch(e)
        {
            toast.error(e);
        }
    },[])

    useEffect(() => {
        try
        {
            axios.get("/Dashboard/best-worst")
            .then((resp) => {
               setBestWorst(resp.data);
            });
        }
        catch(e)
        {
            toast.error(e);
        }
    },[])

    //visual elements set in the if statement
    let graphSummary;
    let compareToLastWeek;
    let profits;
    let options;
    let profitLineSettings;
    let graph;
    let profitLine;
   if(sales.length)
   {

    function sum(numbers)
    {
        let sum = 0;
        numbers.forEach(element => {
            sum += element
        });

        return sum
    }

    let profitData = sales.map(e => e.totalProfit); 
    let salesData = sales.map(e => e.totalSales);
        let lastWeekProfit = sum(profitData.slice(0, 7));
        let thisWeekProfit = sum(profitData.slice(7,14));
        let lastWeekSales = sum(salesData.slice(0, 7));
        let thisWeekSales = sum(salesData.slice(7,14));
    //general calculation function 
    function formatNumber(num, precision = 1) {
        const map = [
          { suffix: 'T', threshold: 1e12 },
          { suffix: 'B', threshold: 1e9 },
          { suffix: 'M', threshold: 1e6 },
          { suffix: 'K', threshold: 1e3 },
          { suffix: '', threshold: 1 },
        ];
      
        const found = map.find((x) => Math.abs(num) >= x.threshold);
        if (found) {
          const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
          return formatted;
        }
      
        return num;
      }
      const percentDiff = ((thisWeekProfit - lastWeekProfit)/ ((thisWeekProfit + lastWeekProfit)/2 )) * 100;
      const percentDIffSales = ((thisWeekSales - lastWeekSales)/ ((thisWeekSales + lastWeekSales)/2 )) * 100;
      //profits information
      if(thisWeekProfit > lastWeekProfit)
      {
        compareToLastWeek = (
            <div className={styles.profitsGreater}>
            <img src={uparrow} alt="up arrow" ></img>
            <p>{(Math.round(percentDiff * 100) / 100).toFixed(0)}%</p>
        </div>
        )
      }
      else if(thisWeekProfit < lastWeekProfit)
      {
        compareToLastWeek = (
        <div className={styles.profitsLower}>
            <img src={uparrow} alt="up arrow" ></img>
            <p>{(Math.round(percentDiff * 100) / 100).toFixed(0)}%</p>
        </div>
        )
      }
      else
      {
        compareToLastWeek = (
        <div className={styles.profitsSame}>
             <p>{(Math.round(percentDiff * 100) / 100).toFixed(0)}%</p>
        </div>
        )
      }


      profitLineSettings = {
        axisX:{
          gridThickness: 0,
       tickLength: 0,
       lineThickness: 0,
       labelFormatter: function(){
         return " ";
       }
         },
     axisY:{
           gridThickness: 0,
       tickLength: 0,
       lineThickness: 0,
       labelFormatter: function(){
         return " ";
       }
         },
     data: [{        
       type: "spline",
           markerType: "none",
       dataPoints: [
         { y: sales[7].totalProfit},
         { y: sales[8].totalProfit },
         { y: sales[9].totalProfit },
         { y: sales[10].totalProfit },
         { y: sales[11].totalProfit },
         { y: sales[12].totalProfit },
         { y: sales[13].totalProfit },
       ]
     }]
      }
  
      profitLine = (
            < CanvasJSChart className={styles.profitLineCanvas} options={profitLineSettings} />
      )
  

    profits = (
      <div className={styles.profitsDisplay}>
        <div className={styles.profitsInfo}>
          <h4>Total Profit</h4>
          <p>Last 7 days</p>
          <div className={styles.profitsDataNumbers}>
            <h2>{formatNumber(thisWeekProfit)}</h2>
            <div className={styles.vsLast}>
              {compareToLastWeek}
              <p>vs last 7 days</p>
            </div>
          </div>
        </div>
          {profitLine}
      </div>
    );
    //graph information
        let slaesCompare;
    if(thisWeekSales > lastWeekSales )
    {
        slaesCompare = 
        (
            <div className={styles.salescompGood}>
                <img src={greenArrow} alt="up arrow"></img>
                <p>{(Math.round(percentDIffSales * 100) / 100).toFixed(0)}%</p>
                <p>vs Last Week</p>
            </div>
        )
    }
    else if(thisWeekSales > lastWeekSales)
    {
        slaesCompare = (
        <div className={styles.salescompBad}>
          <img alt="down arrow"></img>
          <p>{(Math.round(percentDIffSales * 100) / 100).toFixed(0)}%</p>
          <p>vs Last Week</p> 
        </div>
        )
    }
    else
    {
        slaesCompare = (
        <div className={styles.salescomp}>
        <p>{(Math.round(percentDIffSales * 100) / 100).toFixed(0)}%</p>
        <p>vs Last Week</p>
      </div>
        )
    }

    graphSummary = 
    (
        <div className={styles.graphSummary}>
            <h2>{formatNumber(thisWeekSales)}</h2>
            {slaesCompare}
        </div>
    )

         options = {
          // width: ref.current.clientWidth * 0.8,
           animationEnabled: true,
           axisY: {
             title: "",
             gridThickness: 0.5,
             gridDashType: "dash",
             minimum: 0,
             interval: 1000,
             labelFormatter: function(e){
				return formatNumber(e.value, 0);
			}
           },
           data: [
             {
               markerType: "none",
               type: "line",
               legendMarkerType: "circle",
               name: "This Week",
               showInLegend: true,
               dataPoints: [
                 { y: sales[8].totalSales, label: "01" },
                 { y: sales[9].totalSales, label: "02" },
                 { y: sales[10].totalSales, label: "03" },
                 { y: sales[11].totalSales, label: "04" },
                 { y: sales[12].totalSales, label: "05" },
                 { y: sales[13].totalSales, label: "06" },
               ],
             },
             {
               type: "line",
               markerType: "none",
               legendMarkerType: "circle",
               name: "Last Week",
               showInLegend: true,
               dataPoints: [
                 { y: sales[1].totalSales, label: "01" },
                 { y: sales[2].totalSales, label: "02" },
                 { y: sales[3].totalSales, label: "03" },
                 { y: sales[4].totalSales, label: "04" },
                 { y: sales[5].totalSales, label: "05" },
                 { y: sales[6].totalSales, label: "06" },
               ],
             },
           ],
         };

         graph = (
          <CanvasJSChart className={styles.salesGraphCanvas} options={options} />
         )
   }

   let Circle1, Circle2;
   if(bestWorst.length)
   {

    console.log(bestWorst)
    let circleSetup1 = 
    {
      title:{

       text: "Weekly Best Sellers",
       fontColor: "#212121",
        fontSize: 20,
      },
      animationEnabled: true,
      subtitles: [{
        maxWidth: 60,
        text: `${bestWorst[0].unitsSold} \n  Units`,
        fontWeight: "lighter",
        fontColor: "#212121",
        verticalAlign: "center",
        fontSize: 20,
        wrap: true,
        dockInsidePlotArea: true
      }],
			data: [{
        startAngle:  280,
				type: "doughnut",
				dataPoints: [
					{ y: bestWorst[0].unitsSold , color:"#9BC53D" },
					{ y:  bestWorst[0].unitsInStock , color:"#9BC53D80" },
          { y: 280, color:"transparent" },
				]
			}]
    }

    let circleSetup2 = 
    {
      title:{

       text: "Lowest Weekly Sellers",
       fontColor: "#212121",
        fontSize: 20,
      },
      animationEnabled: true,
      subtitles: [{
        maxWidth: 60,
        text: `${bestWorst[1].unitsSold} \n  Units`,
        fontWeight: "lighter",
        fontColor: "#212121",
        verticalAlign: "center",
        fontSize: 20,
        wrap: true,
        dockInsidePlotArea: true
      }],
			data: [{
        startAngle:  280,
				type: "doughnut",
				dataPoints: [
					{ y: bestWorst[1].unitsSold  , color:"#E11818" },
					{ y:  bestWorst[1].unitsInStock , color:"#ffb3b3" },
          { y: 280, color:"transparent" },
				]
			}]
    }

         Circle1 = (
           <div className={styles.cirleGraphContainer}>
             <div className={styles.border}>
               <CanvasJSChart
                 className={styles.circleGraph}
                 options={circleSetup1}
               />
             </div>
             <p>{bestWorst[0].productName}</p>
             <p>Qty in stock: {bestWorst[0].unitsInStock}</p>
           </div>
         );

        Circle2 = (
          <div className={styles.cirleGraphContainer}>
            <div className={styles.border}>
              <CanvasJSChart
                className={styles.circleGraph}
                options={circleSetup2}
              />
            </div>
            <p>{bestWorst[1].productName}</p>
            <p>Qty in stock: {bestWorst[1].unitsInStock}</p>
          </div>
        );
   }



    let shiftData;
    if(shifts.length)
    {
        let fristShift = [...shifts.filter(s => s.shift === "Day")]
        let secondShift = [...shifts.filter(s => s.shift === "Evening")] 
        let thirdShift = [...shifts.filter(s => s.shift === "Night")]   

        let month = new Date().toLocaleString("en-US", { month: "long" });
        let day = new Date().toLocaleString("en-US", { day : '2-digit'})
        let weekDay =  weekday[new Date().getDay()];
        function ordinal_suffix_of(i) {
            var j = i % 10,
                k = i % 100;
            if (j === 1 && k !== 11) {
                return i + "st";
            }
            if (j === 2 && k !== 12) {
                return i + "nd";
            }
            if (j === 3 && k !== 13) {
                return i + "rd";
            }
            return i + "th";
        }

        let displayDay = ordinal_suffix_of(day)
        shiftData = (
            <div>
                <section className={styles.shiftsHeader} >
                    <button className={styles.btnIcon} ><img src={back} alt="prev"></img></button>
                        <h2>Shifts</h2>
                    <button className={styles.btnIcon} ><img src={expand} alt="next"></img></button>
                </section>
                <p>{weekDay}, {month} {displayDay}</p>
                <section className={styles.shiftSection}>
                    <h3>Shift 1</h3>
                        {fristShift.map(e => {
                            return <p>{e.firstName} {e.lastName}</p>
                        })}
                </section>
                <section className={styles.shiftSection}>
                    <h3>Shift 2</h3>
                        {secondShift.map(e => {
                            return <p>{e.firstName} {e.lastName}</p>
                        })}
                </section>
                <section className={styles.shiftSection}>
                    <h3>Shift 3</h3>
                        {thirdShift.map(e => {
                            return <p>{e.firstName} {e.lastName}</p>
                        })}
                </section>
            </div>
        )
    }
let lowProducts;
if(lowStock.length)
{
    lowProducts =(
        <div className={styles.prodList}>
            {lowStock.map((e) => {

                return (
                  <div className={styles.prod}>
                    <div className={styles.prodHeader}>
                      <div>
                        <p>{e.productName}</p>
                        <img src={warning} alt="warning"></img>
                      </div>
                      <p>Low Stock</p>
                    </div>
                    <div className={styles.stockOrderInfo}>
                      <p className={styles.warningText}>{e.reorderPoint}</p>
                      <p className={styles.warningText}>Units</p>
                    </div>
                    <div className={styles.productButtons}>
                      <button>Update</button>
                      <button>Order</button>
                    </div>
                  </div>
                );
                
            })}
        </div>
    )
   
}

	return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <main className={styles.dashboardMain}>
        <section ref={ref} className={styles.sales}>
          <div>
            <div className={styles.salesHeader}>
              <h2>Sales Summary</h2>
              <p>
                View Report <img src={path} alt="expand"></img>{" "}
              </p>
            </div>
            {graphSummary}
          </div>
          {graph}
        </section>
        <section className={styles.products}>{lowProducts}</section>
        <section className={styles.sellers}>
          <div className={styles.circles}>
            {Circle1}
            {Circle2}
          </div>
        </section>
        <section className={styles.profits}>{profits}</section>
        
        <section className={[styles.shifts, styles.desktop].join(" ")}>{shiftData}</section>
      </main>
    </div>
  );
}

export default Dashboard;