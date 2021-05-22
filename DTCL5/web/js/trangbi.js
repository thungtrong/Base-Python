
var diction = {};

$(() => {
    let $name = $("#data tr td:nth-child(1) strong");
    var $thuong = $("#data tr td:nth-child(2) ul");
    var $hacam = $("#data tr td:nth-child(3) ul");

    for (let i =0; i < $name.length; i++){
        diction[$name[i].innerText] = 
        `<table border="3">
            <thead>
                <tr>
                    <th colspan="2">${$name[i].innerText}</th>
                </tr>
                <tr>
                    <th>Thường</th>
                    <th>Hắc Ám</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <ul>
                            ${$thuong[i].innerHTML}
                        </ul>
                    </td>
                    <td>
                        <ul>
                            ${$hacam[i].innerHTML}
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>`;
        
    }

    $("#matranhide .myrow .cell").mouseenter((event) => 
    {
        let target = $(event.target).next().show();
        let x = event.clientX - window.innerWidth*0.29;
        let heightT = target.height();
        let tmp = (event.clientY +  heightT + 60) > (window.innerHeight);
        let y = tmp ? - (heightT +10) : 0;


        target.css("top", y+"px");
        target.css("left", x+"px");
    });

    $("#matranhide .myrow .cell").mouseleave(function (event) { 
        $(event.target).next().hide();
    });
})
