let data = document.getElementById("data");
let form = document.getElementById('SForm');
let btn = document.getElementById('sub');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let selectionSort = async function () {
    let nums = []
    for (let i = 0; i < 100; i++) {
        nums.push(Math.floor(Math.random()*1000));
    }
    sortDrawNums(nums);
    for (let i = 0; i < nums.length; i++) {
        let min = i;
        for (let j = i; j < nums.length; j++) {
            if (nums[min] > nums[j]) {
                min = j;
            }
        }
        let temp = nums[min]
        nums[min] = nums[i];
        nums[i] = temp
        sortDrawNums(nums);
        await sleep(50);
    }
    btn.disabled = false;
    btn.style.color = 'rgb(255, 255, 255)'
}

let mergeSort = async function () {
    let nums = []
    for (let i = 0; i < 100; i++) {
        nums.push(Math.floor(Math.random()*1000));
    }

    sortDrawNums(nums);

    await Ms(nums, 0, nums.length);

    await sleep(10);

    btn.disabled = false;
    btn.style.color = 'rgb(255, 255, 255)'
}

let Ms = async function (nums, start, stop) {

    let distance = stop - start;

    if (distance > 1) {
        nums = await Ms(nums, start, start + Math.floor(distance/2));
        nums = await Ms(nums, start+Math.floor(distance/2)+1, stop);
    } else {
        if (nums[start] > nums[stop]) {
            let temp = nums[start];
            nums[start] = nums[stop];
            nums[stop] = temp;
        }
        sortDrawNums(nums);
        await sleep(50);
        return nums;
    }
    let i = start;
    let j = start+Math.floor(distance/2)+1;
    let tempList = [];
    let done = false;
    while (!done) {
        if (j === stop && !(i === start+Math.floor(distance/2))) {
            tempList.push(nums[i]);
            i++;
        } else if (i === start+Math.floor(distance/2)) {
            if (j === stop) {
                done = true;
            } else {
                tempList.push(nums[j]);
                j++;
            }
        } else {
            if (nums[i] > nums[j]) {
                tempList.push(nums[j]);
                j++
            } else {
                tempList.push(nums[i]);
                i++
            }
        }
    }

    let cNum = start;
    for (let index in tempList) {
        nums[cNum] = index;
        cNum++;
    }

    sortDrawNums(nums);
    await sleep(50);
    return nums;
}

let bubbleSort = async function () {
    let nums = []
    for (let i = 0; i < 100; i++) {
        nums.push(Math.floor(Math.random()*1000));
    }
    sortDrawNums(nums);
    let n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n -i -1; j++) {
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j+1], nums[j]];
                sortDrawNums(nums);
                await sleep(10);
            }
        }
    }
    btn.disabled = false;
    btn.style.color = 'rgb(255, 255, 255)'
}

let insertionSort = async function () {
    let nums = []
    for (let i = 0; i < 100; i++) {
        nums.push(Math.floor(Math.random()*1000));
    }
    sortDrawNums(nums);
    let n = nums.length;
    for (let i = 1; i < n; i++) {
        let cur_num = nums[i];

        while (i > 0 && nums[i - 1] > cur_num) {
            nums[i] = nums[i - 1];
            i -= 1;
        }
        nums[i] = cur_num;
        sortDrawNums(nums);
        await sleep(1);
    }
    btn.disabled = false;
    btn.style.color = 'rgb(255, 255, 255)'
}

let sortDrawNums = function (nums) {
    let str = ''
    for (let i = 0; i < nums.length; i++) {
        str = str + `<li style="height: ${nums[i]+1}px; width: 2px"></li>`
    }

    data.innerHTML = str;
}

let sub = function (e) {
    e.preventDefault();
    btn.disabled = true;
    btn.style.color = 'rgb(100, 100, 100)'
    let method = document.getElementById("method").value;
    console.log(method);
    switch (method) {
        case 'Selection':
            selectionSort().then();
            break;
        case 'Bubble':
            bubbleSort().then();
            break;
        case 'Insertion':
            insertionSort().then();
            break;
        case 'Merge':
            mergeSort().then();
            break;
        default:
            alert('how?');
            break;
    }
}

form.addEventListener('submit', sub);