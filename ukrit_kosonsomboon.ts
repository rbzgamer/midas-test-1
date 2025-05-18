function minEnergy (start: number, shops: number[], stations: number[], target: number): number {
    var energy: number = 0;
    // Every step cost 1 energy
    // Take a bus to other stations has no cost
    // Must go to every shop
    // End at the target point

    console.log('=========================================================================================================')
    shops.forEach(shop => {
        // Move to the shop
        console.log('start : ' + start); 
        console.log('shop : ' + shop);
        console.log('move from start to shop cost : ' + move(start, shop));
        console.log('take bus from start to shop cost : ' + takeBusToTarget(start, stations, shop));
        var minCost: number = Math.min(move(start, shop), takeBusToTarget(start, stations, shop));
        console.log('choose the minimum cost : ' + minCost);
        console.log('=========================================================================================================')
        energy += minCost;
        start = shop;
    });
    
    // Move from the last shop to the target
    console.log('start : ' + start); 
    console.log('target : ' + target);
    console.log('move from the last shop to target cost : ' + move(start, target));
    console.log('take bus from the last shop to target  cost : ' + takeBusToTarget(start, stations, target));
    var minCost: number = Math.min(move(start, target), takeBusToTarget(start, stations, target));
    console.log('choose the minimum cost : ' + minCost);
    console.log('=========================================================================================================')
    energy += minCost;
    
    return energy;
}

// Return cost by causual walk
function move(start: number, target: number): number {
    return Math.abs(start - target);
}

// Return closest station
function findClosestStation(start: number, stations: number[]): number {
    var closestStation: number = stations[0];
    for (var i = 1; i < stations.length; i++) {
        if (Math.abs(start - closestStation) > Math.abs(start - stations[i])) {
            closestStation = stations[i];
        }
    }
    return closestStation;
}

// Return cost from bus station to target
function takeBusToTarget(start: number, stations: number[], target: number): number {
    // Find cost from start to bus station
    var closestStation: number = findClosestStation(start, stations);
    var closestStationToTarget: number = findClosestStation(target, stations);
    var cost: number = move(start, closestStation) + move(closestStationToTarget, target);
    return cost;
}

const start: number = 2;
const shops: number[] = [4,9];
const stations: number[] = [3,6,8];
const target: number = 7;
// Result should be 2 -> 3 -> 4 -> 3 take bus to 8 -> 9 -> 8 -> 7 (take 6 energy)

console.log(minEnergy(start, shops, stations, target));