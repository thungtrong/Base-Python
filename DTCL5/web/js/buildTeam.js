function randomInt(max)
{
    return Math.floor(Math.random() * max);
}

function union(a, b) 
{
    return new Set([...a, ...b]);
}

function merge_traits(a, b)
{
    traits = {}
    for (row of a) {
        traits[row[0]] = {
            'champions': row[1],
            'ranks': row[2]
        }
    }

    for (row of b) {
        traits[row[0]] = {
            'champions': row[1],
            'ranks': row[2]
        }
    }
    return traits;
}

function get_all_predict_champ(team, traits, champions)
{
    traits_list = [];
    for (champ of team) {
        trait_of = champions[champ][2];
        traits_list = union(traits_list, trait_of);
    }

    predict = [];
    for (trait of traits_list)
    {
        predict = union(predict, traits[trait]['champions']);
    }
    return predict;
}

// Chon ngau nhien 1 phan tu trong tap arr
function choice(arr)
{
    arr = Array.from(arr);
    let i = randomInt(arr.length);
    
    return arr[i];
}

// Tao team ngau nhien co n_champ tướng
function random_team(n_champ, traits, champions)
{
    // Khoi tao
    n = champions.length;
    team = [];
    predict = new Set([randomInt(n)]);

    // Chon den khi du chi tieu
    while (team.length < n_champ)
    {
        // Chon ngau nhien 1 trong danh sach co lien quan toi doi hinh
        champ = choice(predict);
        
        // Khong de chon trung lap
        if (!team.includes(champ))
        {
            team.push(champ);
            predict = get_all_predict_champ(team, traits, champions);
        }
    }

    return team;
}

// Noi hai tap lai
function extend(arr1, arr2)
{
    return [...arr1, ...arr2];
}

// Lay ra cac he ma doi hinh co
function get_traits_in_team(team, data_champions) 
{
    // Gom tất cả tộc hệ thành một mảng
    let tmp = [];
    team = [...(new Set(team))]
    for (champ of team)
    {
        traits = data_champions[champ][2]
        tmp = extend(tmp, traits);
    }

    // Dem so luong cua tung phan tu
    let value_counts = {}
    for (trait of tmp)
    {
        value_counts[trait] = value_counts[trait] ? value_counts[trait] + 1: 1;
    }

    // Sort theo chieu giam dan
    let sort_able = [];
    for (trait in value_counts)
    {
        sort_able.push([trait, value_counts[trait]]);
    }
    sort_able.sort((a, b) => -(a[1] - b[1]));
    
    // Chuyen sort thanh object
    value_counts = {}
    for (pair of sort_able)
    {
        value_counts[pair[0]] = pair[1];
    }
    
    return value_counts;
}

function create_cell(champ, data_champions)
{
    let champion;
    let name_champ;
    let price;
    let traits_champ;
    let div_trait;

    champion = data_champions[champ];

    let cell = $("#cell-example").clone().removeClass("hidden").removeAttr("id");
    cell.data("championId", champ);
    
    name_champ = champion[0].replace(/\s/g, "");
    price = champion[1];
    traits_champ = champion[2];
    
    cell.find("#name-champion")
            .html(`<h5> ${name_champ} <span id="price">${price} G</span></h5>`);
    
    cell.find("#img-top").attr("src", `./image/${name_champ}.jpg`);
    
    div_trait = cell.find(".card div#trait");
    
    for (let trait of traits_champ)
    {
        div_trait.append(`<p>${trait}</p>`);
    }
    return cell;
}

function display_teams(team, data_champions)
{
    
    let cell;

    let show_team = $("#show-team");

    for (let i = 0; i < team.length; i++)
    {
        cell = create_cell(team[i], data_champions)
        cell.data("action", "remove");
        show_team.append(cell);
    }
}

function roll_random_team(data_champions, data_traits)
{
    $("#show-team").empty();
    let num = $("#form-roll #num-champion").val();
    num = num ? num : 8;

    let team = random_team(num, data_traits, data_champions);
    
    let traits = get_traits_in_team(team, data_champions);

    display_teams(team, data_champions);
    display_traits_in_team(traits, data_traits);
}

function compare(a, b)
{
    let a_active = a.data("active");
    let b_active = b.data("active");

    if (a_active == b_active)
    {
        let a_name = a.find("#info-trait #name").text();
        let b_name = b.find("#info-trait #name").text();
    
        return a_name <= b_name;
    }
    return -(a_active - b_active);
}

function display_traits_in_team(traits, data_traits)
{

    let example = $(`
    <div class="trait-wrapper">
        <span id="count"></span>
        <span id="info-trait">
            <p id="name"></p>
            <p id="ranks"></p>
        </span>
        <div id="background"></div>
    </div>`);
    let ranks;

    let next;
    let current;
    let tmp_e;
    
    let count;

    let ranks_list;
    
    let show_traits = $("#formmation #show-traits").empty();

    let have_active = [];
    let no_have_active = [];

    let check;
    for (key in traits)
    {
        check = false;

        count = traits[key];

        tmp_e = example.clone();
        tmp_e.find("#count").text(count);
        tmp_e.find("#info-trait #name").text(key);

        ranks_list = tmp_e.find("#ranks");
        ranks = data_traits[key].ranks;
        
        for (let i = 0; i < ranks.length; i++)
        {
            current = ranks[i];
            
            current_element = $(`<span>${current}</span>`);
            ranks_list.append(current_element);
            if (i != ranks.length - 1)
            {
                ranks_list.append(" &middot; ");
            }
            next = ranks[i + 1] ? ranks[i + 1] : 20;
            
            if (count >= current && count < next)
            {
                check = true;
                current_element.addClass("active");
                if (ranks.length == 1)
                {
                    tmp_e.data("active", next+100);
                }
                else
                {
                    tmp_e.data("active", next);
                }
                
            }
        }

        if (check)
        {
            have_active.push(tmp_e);
        } else
        {
            no_have_active.push(tmp_e);
        }
        
    }
    have_active.sort(compare);
    no_have_active.sort(compare);

    for (let i = 0; i < have_active.length; i++)
    {
        show_traits.append(have_active[i]);
    }
    for (let i = 0; i < no_have_active.length; i++)
    {
        show_traits.append(no_have_active[i]);
    }
}

function show_champ_trait(data_toc, data_champions, type_trait){
    let row;
    let show_toc = $(`#show-${type_trait}`);
    let body;
    let champs;
    let cell;
    let name;

    for (toc of data_toc)
    {
        name = toc[0].replace(/\s/g, "");
        row = $(
            `<div class="row-trait">
                <div id="tag-header">
                <a data-toggle="collapse" data-target="#${name}" role="button" data-expanded="true">
                <span id="name">${toc[0]}</span>
                <span class="glyphicon glyphicon-plus"></span>
                </a> 
                </div>
                <div class="row card card-body collapse" id="${name}">
                
                </div>
            </div>`);
        
        champs = toc[1];
        body = row.find(".card-body");
        
        for (champ of champs) {
            
            cell = create_cell(champ, data_champions);
            cell.data("action", "add");
            body.append(cell);
        }

        show_toc.append(row);
    }
    

}
$(() => {
    // Lấy dữ liệu

    let trait_to_array = (element) => 
    {
        let tmp = element.trim().split("|");
        tmp[1] = tmp[1].split(",").map(Number)
        tmp[2] = tmp[2].split(",").map(Number)
        return tmp
    };

    let champions_to_array = (element) => 
    {
        let tmp = element.trim().split(",");
        tmp[2] = tmp[2].split("-").map((e) => e.trim());

        return tmp;
    }

    let data_toc = $("div#toc")
                    .text().trim()
                    .split("\n")
                    .map(trait_to_array);
    
    let data_he = $("div#he")
                    .text().trim()
                    .split("\n")
                    .map(trait_to_array);
                    
    let data_traits = merge_traits(data_toc, data_he);

    var data_champions = $("div#champions")
                        .text().trim()
                        .split("\n")
                        .map(champions_to_array);

    // console.log(data_toc);
    // console.log(data_he);
    // console.log(data_traits)
    // console.log(data_champions);

    // Thuat toan du doan
    roll_random_team(data_champions, data_traits);
    show_champ_trait(data_toc, data_champions, "toc");
    show_champ_trait(data_he, data_champions, "he");
    
    $("a#roll").on("click", (event) => {
        event.preventDefault();
        roll_random_team(data_champions, data_traits);
    });

    $(".champion").click((event) => {
        let target = $(event.target);
        if (!target.data("championId"))
        {
            target = $(target.parents(".champion"));
        }
        let champ = target.data("championId");
        let action = target.data("action"); 
        
        console.log(champ);
        
        if (action == "remove")
        {
            target.remove();
        }
        if (action == "add")
        {
            let show_team = $("#show-team");
            if (show_team.find(".champion").length == 9)
            {
                alert("Full splot");
                return false;
            }
            let cell = target.clone(true);
            cell.data("action", "remove");
            show_team.append(cell);
        }

        let team_e = $("#show-team .champion");
        let team = []
        for (let i = 0; i < team_e.length; i++)
        {
            team.push($(team_e[i]).data("championId"));
        }
        let traits = get_traits_in_team(team, data_champions);
        display_traits_in_team(traits, data_traits);
    });
});