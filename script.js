// geting canvas by id c
var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen- полноэкранный режим
c.height = window.innerHeight;
c.width = window.innerWidth;

//chinese characters - taken from the unicode charset-китайские иероглифы - взяты из кодировки юникода
var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
//converting the string into an array of single characters-преобразование строки в массив одиночных символов
matrix = matrix.split("");

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain - количество столбиков для дождя
//an array of drops - one per column
var drops = [];
//x below is the x coordinate - массив дропов - по одному на столбец
//1 = y co-ordinate of the drop(same for every drop initially) - 1 = координата y капли (одинаковая для каждой капли изначально)
for(var x = 0; x < columns; x++)
    drops[x] = 1; 

//drawing the characters- рисование
function draw()
{
    //Black BG for the canvas - чёрный для холста
    //translucent BG to show trail - полупрозрачный фон, чтобы показать след
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops - зацикливание на каплях
    for(var i = 0; i < drops.length; i++)
    {
        //a random chinese character to print - случайный китайский иероглиф для печати
        var text = matrix[Math.floor(Math.random()*matrix.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);

        //sending the drop back to the top randomly after it has crossed the screen - отправка капли обратно наверх случайным образом после того, как она пересекла экран
        //adding a randomness to the reset to make the drops scattered on the Y axis - добавление случайности в сброс, чтобы капли разбрасывались по оси Y
        if(drops[i]*font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate - увеличение координаты Y
        drops[i]++;
    }
}