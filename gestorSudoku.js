var area1,area2,area3,area4,area5,area6,area7,area8,area9;
var app;

Vue.component('areas',{
    props:['nom','id'],
    data:function(){return {caselles:[]}},
    methods:{
        afegirDades:function(dades){dades.forEach(dada => this.caselles.push(dada))},
    },
    template:`
    <div id="area1">
        <table>
            <tr><td>{{caselles[0]}}</td><td>{{caselles[1]}}</td><td>{{caselles[2]}}</td></tr>
            <tr><td>{{caselles[3]}}</td><td>{{caselles[4]}}</td><td>{{caselles[5]}}</td></tr>
            <tr><td>{{caselles[6]}}</td><td>{{caselles[7]}}</td><td>{{caselles[8]}}</td></tr>
        </table>
    </div>`
});



function iniciar()
{
    app = new Vue({
        el: '#app',
        data: {
          dades:"",
        },
        template: `
            <div>            
              <areas style="top:8px;" id="area1" nom="area1" ref="ar1" ></areas>
              <areas style="left:120px;top:8px;" id="area2" nom="area2" ref="ar2"></areas>
              <areas style="left:240px;top:8px;" id="area3" nom="area3" ref="ar3"></areas>
              <areas style="left:0px;top:103px;" id="area4" nom="area4" ref="ar4"></areas>
              <areas style="left:120px;top:103px;" id="area5" nom="area5" ref="ar5"></areas>
              <areas style="left:240px;top:103px;" id="area6" nom="area6" ref="ar6"></areas>
              <areas style="left:0px;top:199px;" id="area7" nom="area7" ref="ar7"></areas>
              <areas style="left:120px;top:199px;" id="area8" nom="area8" ref="ar8"></areas>
              <areas style="left:240px;top:199px;" id="area9" nom="area9" ref="ar9"></areas>
            </div>
            `
      });
      area1 = app.$refs.ar1;
      area2 = app.$refs.ar2;
      area3 = app.$refs.ar3;
      area4 = app.$refs.ar4;
      area5 = app.$refs.ar5;
      area6 = app.$refs.ar6;
      area7 = app.$refs.ar7;
      area8 = app.$refs.ar8;
      area9 = app.$refs.ar9;
      desarDades();
      omplirTauler();
}

function desarDades()
{
    const dadesSudoku = [{//Array d'objectes javascript 
        nom:"sudoku1",
        nums:[[5,3,4,6,7,2,1,9,8],[6,7,8,1,9,5,3,4,2],[9,1,2,3,4,8,5,6,7],
              [8,5,9,4,2,6,7,1,3],[7,6,1,8,5,3,9,2,4],[4,2,3,7,9,1,8,5,6],
              [9,6,1,2,8,7,3,4,5],[5,3,7,4,1,9,2,8,6],[2,8,4,6,3,5,1,7,9]]
        }, 
        {
        
        }];
        const DB_VERSION = 6;
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
        READ_WRITE: "readwrite"
        };
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        var peticioObertura = window.indexedDB.open("Sudokus", DB_VERSION);
        var db;
        peticioObertura.onerror = function(event) {
        alert("Problema!");
        };
        peticioObertura.onsuccess = function(event) {
        db = event.target.result;
        };

        peticioObertura.onupgradeneeded = function(event) {
            var db = event.target.result;
            var magatzemSudoku = db.createObjectStore("dadesSudoku2", {
            keyPath: "nom"
            });
            
            for (var i in dadesSudoku) 
                for(var fila in i.nums)
                    for(var cela in fila)
                        magatzemSudoku.add(dadesSudoku[i][fila][cela]);

            magatzemSudoku.createIndex("nom", "nom", {
            únic: false
            });
            magatzemSudoku.createIndex("nums", "nums", {
            únic: true
            });
            
            magatzemSudoku.transaction.oncomplete = function(event) {
            var magatzemSudoku = db.transaction("dadesSudoku", "readwrite").objectStore("dadesSudoku2");
            for (var fila in dadesSudoku.nums)
                for(var cela in fila){
                    console.log("Fila: " + [fila]);
                    var peticio = magatzemSudoku.add(dadesSudoku.nums[fila][cela]);
            }
          }
        }      
}


function omplirTauler()
{
    app.$refs.ar1.afegirDades([5,3,4,6,7,2,1,9,8]);
    app.$refs.ar2.afegirDades([6,7,8,1,9,5,3,4,2]);
    app.$refs.ar3.afegirDades([9,1,2,3,4,8,5,6,7]);
    app.$refs.ar4.afegirDades([8,5,9,4,2,6,7,1,3]);
    app.$refs.ar5.afegirDades([7,6,1,8,5,3,9,2,4]);
    app.$refs.ar6.afegirDades([4,2,3,7,9,1,8,5,6]);
    app.$refs.ar7.afegirDades([9,6,1,2,8,7,3,4,5]);
    app.$refs.ar8.afegirDades([5,3,7,4,1,9,2,8,6]);
    app.$refs.ar9.afegirDades([2,8,4,6,3,5,1,7,9]);
}

