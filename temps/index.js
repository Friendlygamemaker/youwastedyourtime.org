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
        default:
            alert('how?');
            break;
    }
}

form.addEventListener('submit', sub);