import Decimal from "break_eternity.js";

if(localStorage.getItem("boredincremental")){
    var parseddata = JSON.parse(localStorage.getItem("boredincremental"))
} 

console.log(parseddata)

if(parseddata){
    var data = {
        pointValue: new Decimal(parseddata.pointValue),
        incrementValue: new Decimal(parseddata.incrementValue),
        upgradeCost: new Decimal(parseddata.upgradeCost),
        intervalCost: new Decimal(parseddata.intervalCost),
        intervalTime: parseddata.intervalTime,
        decimalPlaceCount: parseddata.decimalPlaceCount
    }
} else {
    var data = {
        pointValue: new Decimal(0),
        incrementValue: new Decimal(0.001),
        upgradeCost: new Decimal(0.01),
        intervalCost: new Decimal(0.001),
        intervalTime: 500,
        decimalPlaceCount: 6
    }
}


document.getElementById("currentPointIncrement").innerHTML = data.incrementValue;

document.getElementById("upgradeCost").innerHTML = data.upgradeCost;

document.getElementById("currentPointInterval").innerHTML = data.intervalTime;

function save(){
    localStorage.setItem("boredincremental", JSON.stringify(data));
}


document.onvisibilitychange = function() {
    if (document.visibilityState === 'hidden') {
        save();
    }
};

document.getElementById("saveButton").addEventListener('click', function(){
    save();
})

function mainIncrement(){
    data.pointValue = (data.pointValue.add(data.incrementValue));
    document.getElementById("pointValue").innerHTML = data.pointValue.toPrecision(data.decimalPlaceCount);
}

document.getElementById("upgradeIncrement").addEventListener('click', function(){
    console.log(data.pointValue.cmp(data.upgradeCost));
    if(data.pointValue.cmp(data.upgradeCost)==1){
        data.pointValue = data.pointValue.subtract(data.upgradeCost);
        data.upgradeCost = data.upgradeCost.multiply(3.141);  
        data.incrementValue = data.incrementValue.multiply(2.239482345);
        document.getElementById("upgradeCost").innerHTML = data.upgradeCost.toPrecision(data.decimalPlaceCount);
        document.getElementById("currentPointIncrement").innerHTML = data.incrementValue.toPrecision(data.decimalPlaceCount);
    }
})

document.getElementById("upgradeInterval").addEventListener('click', function(){
    console.log(data.pointValue.cmp(data.upgradeCost));
    if(data.pointValue){
        data.intervalTime = data.intervalTime - (data.pointValue.multiply(16))/50;
        if(data.intervalTime<=0){
            data.intervalTime = 1;
            document.getElementById("upgradeInterval").innerText = "he's going fast (max)";
            document.getElementById("upgradeInterval").style = "cursor: not-allowed; pointer-events: none;";
        } else {
            data.pointValue = data.pointValue.subtract(data.pointValue);
        }
        document.getElementById("currentPointInterval").innerHTML = data.intervalTime;
    }
})

function mainGameLoop(){
    mainIncrement();
    let intervalTime = data.intervalTime;
    setTimeout(mainGameLoop, intervalTime);
}
mainGameLoop()