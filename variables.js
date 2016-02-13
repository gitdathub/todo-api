var person = {
    name:'andrew',
    age:24
};

function updatePerson(obj){
    obj = {
        name:'Andrew',
        age:24
    };
}

updatePerson(person);
//console.log(person);

grade = [24,54,23];

function updateGrade(arr){
    arr[2] = 99;
}

updateGrade(grade);
console.log(grade);