//动态改变html元素的大小
//获取当前屏幕尺寸的大小
function changeScreenWidth(){
	//获取当前屏幕的尺寸
	var currentW = $(window).width();
	var currentH = $(window).height();
	$("html").css("font-size",currentW/18.75/16*100 + "%");
	var h = (currentH - $("#index-header").height() - $("#index-footer").height())/parseFloat($("html").css("font-size"));
	//zepto中height方法与css方法无法获取隐藏元素的宽高，而jquery中是可以通过height方法orcss方法获取隐藏元素的宽高的
	var h1 = (currentH - $("#person-header").height()-$("#index-footer").height())/parseFloat($("html").css("font-size"));
	$("#index-wrap").css("height",h + "rem");
	$("#menu").css("height",h + "rem");
	$("#content").css("height",h + "rem");
	$("#shopping-cart-wrap").css("height",h + "rem");
	$("#person-wrap").css("height",h1 + "rem");
	$("#crazy-wrap").css("height",h + "rem");

}
//初始话，保证出现页面的时候按照该尺寸进行显示
changeScreenWidth();

//使用resize事件动态设置html元素的大小
$(window).resize(function (){
	changeScreenWidth();
});



//底部菜单切换功能
//背景图片存个数组
var arrBg = ["../img/bg0.png","../img/bg1.png","../img/bg2.png","../img/bg3.png"];
$(".footer-list").find("li").each(function (index){
	$(this).click(function (){
		//设置所有包裹层隐藏
		$(".column-wrap").css("display","none");
		//设置所有头部隐藏
		$(".column-head").css("display","none");
		//设置底部菜单背景图片切换
		$(".footer-list").find("li").css("background","");
		$($(".footer-list").find("li")[0]).css("background-image","url(../img/首页.png)");
		
		//设置当前包裹层显示
		$($(".column-wrap")[index]).css("display","block");
		$(this).css("background-image","url("+arrBg[index]+")");
		if(index<2){
			$($(".column-head")[0]).css("display","block");
		}else {
			$($(".column-head")[index-1]).css("display","block");
		}
	});
});





//闪送超市的菜单切换
//获取菜单内所有的一级子元素
$(".me-list").find("span").each(function (index){
	$(this).click(function (){
		$(".me-list").find("span").css("border-left","0.3rem solid transparent");
		$(".content-wrap").removeClass("dis-blk");
		$(this).css("border-left","0.3rem solid #ffe065");
		$($(".content-wrap")[index]).addClass("dis-blk");
	});
});


//全部分类及综合排序功能
//创建一个数组，用于保存模态窗口中的元素
var arrMod1 = ["全部分类","进口水果","国产水果"];
var arrMod2 = ["综合排序","销量最高","价格最低","价格最高"];
function model(bol){
	//创建div标签
	var $div = $("<div class='models'></div>");
	//创建ul标签
	var $ul = $("<ul class='models-list clear-f'></ul>");
	if(bol){
		//创建li
		for(var i=0; i<arrMod1.length; i++){
			var $li = $("<li></li>").text(arrMod1[i]);
			if(i == 0){
				$li = $("<li class='models-active'></li>").text(arrMod1[i]);
				$ul.append($li);
				continue;
			}
			$ul.append($li);
		}
	}else {
		for(var j=0; j<arrMod2.length; j++){
			var $li = $("<li></li>").text(arrMod2[j]);
			if(j == 0){
				$li = $("<li class='models-active'></li>").text(arrMod2[j]);
				$ul.append($li);
				continue;
			}
			$ul.append($li);
		}
	}
	
	//创建一个div标签
	$childDiv = $("<div class='models-border'></div>");
	$div.append($ul).append($childDiv);
	$(".order").after($div);
}

//添加点击事件触发模态窗口  顺序有点颠倒什么鬼？？？
model(false);
model(true);
var count = 2;
$(".order").children("span").each(function (index){
	$(this).click(function (){
		//获取父标签的高度
		var contentH = $("#content").height();
		var orderH = $(".order").height();
		if(count == index){
			$(".models").css("display","none");
			$("#content").css("overflow","");
			count = 2;
		}else {
			$(".models").css("display","none");
			$($(".models")[index]).css("display","block");
			$($(".models-border")[index]).css("height",contentH - orderH - $(".models-list").height()+"px");
			$("#content").css("overflow","hidden");
			count = index;
		}
	});
});

//给模态窗口中的按钮添加点击事件
$(".models").find("li").each(function(index){
	$(this).click(function (){
		$(".models").find("li").removeClass("models-active");
		$(this).addClass("models-active");
		if(index <3){
			$($(".order").children("span")[0]).text($(this).text());
		}else {
			$($(".order").children("span")[1]).text($(this).text());
		}
		$(".models").css("display","none");
		count = 2;
	});
	
});


var selectFn = function (){
	//实现购物车的单选与全选功能
	$(".select-sigle").each(function (index){
		//另外需要注意有些浏览器上无法看到原生js的方法自定义添加上去的属性，而可以看到jquery中通过attr添加上去的属性
		this.off = true;
		//先清除，后添加的目的是保证，点击事件触发的时候，元素身上只有最后一次添加的事件
		$(this).off("click");
		$(this).click(function (){
			if(this.off){
				$(this).css("background-image","url(../img/反选.png)");	
				this.off = false;
				jugue();
			}else {
				$(this).css("background-image","url(../img/dui.png)");
				this.off = true;
				jugue();
			}
			countMoney();
		});
		
		jugue();
		
	});
	//用于判断全选与全不选的条件
	function jugue(){	
		for(var i=0; i<$(".select-sigle").length; i++){
			if($(".select-sigle")[i].off){
				$(".select-all-goods").css("background-image","url(../img/dui.png)");
				$(".select-all-goods").attr("off","false");
			}else {
				$(".select-all-goods").css("background-image","url(../img/反选.png)");
				$(".select-all-goods").attr("off","true");
				break;
			}
		}
	}
	//给全选按钮添加全选与全不选功能
	$(".select-all-goods").attr("off","false");
	//先清除，后添加的目的是保证，点击事件触发的时候，元素身上只有最后一次添加的事件
	$(".select-all-goods").off("click");
	$(".select-all-goods").click(function (){
		//这里需要注意以下设置的自定义属性如值为off = "false"这样的因为此时false为字符串false在if判断条件中会隐式转化为布尔值true而不是false，如果向把字符串false转化为布尔值false就需要使用一些强制的手段，用返回值or正则来进行转化
		if(String($(this).attr("off")) == "true"){
			$(".select-all-goods").css("background-image","url(../img/dui.png)");
			$(".select-all button").text("选好了").css("background","");
			$(".select-sigle").each(function (index){
				$(this).css("background-image","url(../img/dui.png)");
				this.off = true;
			});
			$(this).attr("off","false");
			countMoney();
		}else {
			$(".select-all-goods").css("background-image","url(../img/反选.png)");
			$(".select-sigle").each(function (index){
				$(this).css("background-image","url(../img/反选.png)");	
				this.off = false;
			});
			$(this).attr("off","true");
			$(".total-money strong").text("￥0");
			$(".select-all button").text("满￥0起送").css("background","gray");
		}
	});
}

//selectFn();

//总价格计算
function countMoney(){
	//获取所有开关为true的商品
	var $price = $(".content-list").find(".cart-shopping-price");
	var $sigle = $(".content-list").find(".select-sigle");
	var $math = $(".content-list .shop-math");
	//这里在进行计算的时候result需要设置初始值为number类型，不然初始计算的时候会当成undefined进行计算结果则是NaN
	var result = 0;
	for(var i=0; i<$sigle.length; i++){
		if(!$sigle[i].off){
			continue;
		}else {
			//可一使用slice方法截取字符串
			//用同一个dl中的商品的价格乘以同一个商品中的数量
			result += (parseFloat($price[i].innerHTML.trim().slice(1))*parseInt($($math[i]).attr("number")));
		}
	}
	//通过Math.round(result*100)/100的方式来取小数
	$(".total-money").find("strong").text("￥"+Math.round(result*100)/100);
}

//countMoney();

//给增加和减少按钮添加增减功能
//var plusFn = function (classNm,blo){
//	//获取所有的加加按钮,并添加点击事件
//	$(".plus").each(function (index){
//		var price = parseFloat($($(".cart-shopping-price")[index]).text().slice(1));
//		$(this).click(function (){
//			var count = parseInt($($(".shop-math")[index]).attr("number"));
//			count++;
//			$($(".shop-math")[index]).attr("number",count).text(count);
//			$($(".cart-shopping-price")[index]).text("￥"+price*count);
//			countMoney();
//		});
//	});
//}
//plusFn();

var subtractFn = function (classNm,blo){
	//获取所有的加加按钮,并添加点击事件
	console.log($(".plus").length);
	$("."+classNm).each(function (index){
		//这里先清除事件的原因是，没点击生成一次商品，就会调用一次subtractFn（）函数相当于，给++or--的标签重复添加了多次事件，所以先情况，后添加，保证，最后是最后添加的一次事件
		$(this).off("click");
		$(this).on("click",function (){
			//var price = parseFloat($(this).parents(".co-list").find(".cart-shopping-price").text().slice(1));
			var count = parseInt($(this).parents(".co-list").find(".shop-math").attr("number"));
			console.log(count)
			if(blo){
				count++;
				$(this).parents(".co-list").find(".shop-math").attr("number",count).text(count);
				console.log(count)
				//$(this).parents(".co-list").find(".cart-shopping-price").text("￥"+price*count);
				//$($(".shop-math")[index]).attr("number",count).text(count);
				//$($(".cart-shopping-price")[index]).text("￥"+price*count);
				countMoney();
			}else {
				count--;
				if(count < 1){
					$(this).parents(".co-list").remove();
					countMoney();
					return;
				}
				$(this).parents(".co-list").find(".shop-math").attr("number",count).text(count);
				//$(this).parents(".co-list").find(".cart-shopping-price").text("￥"+price*count);
				countMoney();
			}
			
		});
		//$(this).click();
	});
}


//实现点击添加物品到购物车
//这里通过代理模式来做
//为每个商品父标签添加点击事件
$(".index-shopping").each(function (index){
	$(this).click(function (e){
		var e = e || event;
		if($(e.target).hasClass("addGoods")){
			//获取该dl元素下对应的商品信息
			var shopObj = {
				title: $(this).find(".index-shopping-name").text(),
				price: $(this).find(".index-shopping-price").text().split(" ")[0],
				pics: $(this).find(".index-shopping-pics").css("background-image")
			}
			//通过dom节点添加元素的方法
			addShopping(shopObj);
			//提供单选与多选的方法
			selectFn();
			//计算价格的方法
			countMoney();
			//++ or --的方法
			subtractFn("plus",true);
			subtractFn("subtract",false);
		}
	});
})

function addShopping(obj){
	//创建新元素
	//创建dl标签
	//获取购物清单中
	var flag = true;
	//获取
	var $dd1 = $(".content-list").find(".cart-shopping-name");
	var $dd2 = $(".content-list").find(".shop-math");
	for(var i=0; i<$dd1.length; i++){
		if(obj.title != $($dd1[i]).text()){
			flag = true;
		}else {
			flag = false;
			var count = parseInt($($dd2[i]).attr("number"));
			count++;
			$($dd2[i]).attr("number",count).text(count);
			break;
		}
	}
	if(flag){
			var $dl = $("<dl class='co-list clear-f'></dl>").html(
				'<dt class="select-sigle"></dt>'+
				'<dt style=background-image:'+obj.pics+'></dt>'+
				'<dd class="cart-shopping-name">'+obj.title+'</dd>'+
				'<dd>'+
					'<span class="cart-shopping-price">'+ obj.price +'</span>'+
					'<span class="shop-math" number="1">1</span>'+
				'</dd>'+
				'<dd>'+
					'<span class="subtract">-</span>'+
					'<span class="plus">+</span>'+
				'</dd>'
			);
		$(".content-list").append($dl);
	}
}
//var myCat = function (){
//	var length = $(".shop-math").length
//	for(var i=0; i<length; i++){
//		$(".subtract")[i].index = i;
//		$(".subtract")[i].onclick = function (){
//			//var price = parseFloat($($(".cart-shopping-price")[this.index]).text().slice(1));
//			//var count = parseInt($($(".shop-math")[this.index]).attr("number"));
//			var price = parseFloat($(this).parents(".co-list").find(".cart-shopping-price").text().slice(1));
//			var count = parseInt($(this).parents(".co-list").find(".shop-math").attr("number"));
//			count--;
//			if(count <1){
//				$(this).parents(".co-list").remove();
//				countMoney();
//				return;
//			}
//		}
//		
//	}
//}
//myCat();



//实现倒计时功能
//存个保存倒计时时间的数组
//关于倒计时的原理就是设置一个将来的时间，然后在获取当前的时间，通过getTime()方法转化为毫秒数，然后进行相减，最后把毫秒差值在转化为时分秒
/*
 1、设置时间可以使用的格式为：年-月-日 时:分:秒    如2016-11-30 22：10：09  小时与月份之间注意有空格
 2、注意获取到的月份比实际月份小1，因为月份是从0-11取值，所以月份得加1
 3、将时间间隔转化为时分秒的方式：var myHour = Math.floor(during/3600/1000%24);
						  var myMinute = Math.floor(during/60/1000%60);
						  var mySeconds = Math.floor(during/1000%60);
 * */
var arrTime = [10,12,15,19];
var timer = null;
var backTime = function (time){
	//开启定时器
	//获取当前时间
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth();
	var day = myDate.getDate();
	var str = year +"-" + (month+1) +"-"+ day +" "+ time+":00:00";
	var backDate = new Date(str);
	//获取时间差
	var during = backDate.getTime() - myDate.getTime();
	if(during >0){
		//转化为时分秒
		var myHour = Math.floor(during/3600/1000%24);
		var myMinute = Math.floor(during/60/1000%60);
		var mySeconds = Math.floor(during/1000%60);
		var timeStr = myHour +":"+myMinute+":"+mySeconds;
		$(".time-mark .time-end").text(timeStr);
		$(".time-mark .time-start").text("距本场结束");
	}else {
		clearInterval(timer);
		$(".time-mark .time-end").text("00:00:00");
		$(".time-mark .time-start").text("本场已结束");
		//$(".time-list .count-time").text("已结束");
	}
}


timer = setInterval(function (){
	backTime(arrTime[0]);
},10);

//疯狂秒杀页面添加tab切换功能
var tabChange = function (){
	//获取所有切换标签
	$("#crazy-time li").each(function (index){
		$(this).click(function (){
			//清除样式
			$("#crazy-time li").css({"background-color":"#272c2a","color":"#fff"});
			$(".count-time").next("span").removeClass("time-bg");
			$(".shopping-one").removeClass("dis-bck");
			
			//添加样式
			$(this).css({"background-color":"#fdd000","color":"#333"});
			$(this).find(".count-time").next("span").addClass("time-bg");
			$($(".shopping-one")[index]).addClass("dis-bck");
			
			//开启定时器,切换的时候保证
			clearInterval(timer);
			timer = setInterval(function (){
				backTime(arrTime[index]);
			},10);
			
		});
	});
}
tabChange();


//以下皆是获取数据，并将数据添加到页面的操作
//定义一个ajax函数
var sendAjax = function (cUrl,data,callback){
	//发起ajax请求
	$.ajax({
		type:"GET",
		url: "http://www.vrserver.applinzi.com/aixianfeng/"+ cUrl,
		data: data,
		success:callback
	});
	
}

//获取轮播图及菜单数据
sendAjax("apihome.php","",bannerCallBack);

//注意这里的回调函数得用函数声明的方式来书写，用函数表达式书写不行，因为不可以进行函数提升
function bannerCallBack(data){
	//解析数据
	var dataObj = JSON.parse(data);
	var menu = dataObj.data.menu;
	var slide = dataObj.data.slide;
	for(var index in slide){
		var imgObj = slide[index].activity.img;
		bannerDom(imgObj);
	}
	
	for(var index in menu){
		var imagesObj = menu[index].activity.img;
		var textObj = menu[index].activity.name;
		menuDom(imagesObj,textObj,index);
	}
	autoPlay();
	crazyFn();
}

//添加轮播图函数
function bannerDom(imgUrl){
	//创建一个div标签
	var $oDiv = $("<div class='swiper-slide bg-banner'></div>");
	$oDiv.css("background-image","url("+imgUrl+")");
	$(".swiper-wrapper").append($oDiv);
}

function autoPlay(){
	//轮播图功能
	//注意轮播功能必须里面有子标签才会生效，所以的放在ajax请求成功的回调函数里面执行
	var mySwiper = new Swiper(".swiper-container",{
		direction: "horizontal",
		loop: true,
		autoplay: 3000,
		speed:700,
		autoplayDisableOnInteraction : false,
		touchRatio : 1
	});
}

//添加菜单项函数
function menuDom(img,txt,index){
	//创建一个li标签
	var $li = $("<li class='sp-menu'></li>");
	if(index == 0 || index == 4){
		$li.css("margin-left","1rem");
	}
	//创建一个a标签
	var $a = $("<a href='javascript:;'></a>").text(txt);
	$li.css("background-image","url("+img+")").append($a);
	$(".sp-list").append($li);
}



//疯狂购物页面显示与隐藏
function crazyFn(){
	//获取疯狂秒杀标签
	$($("#special .sp-menu")[1]).click(function (){
		$("#crazy-wrap").css("display","block");
		$("#crazy-header").css("display","block");
	});
	
	//获取退出疯狂秒杀页面标签
	$("#crazy-header .back-index").click(function (){
		$("#crazy-wrap").css("display","none");
		$("#crazy-header").css("display","none");
	});
}

//获取疯狂秒杀的数据
sendAjax("apimiaosha.php","",crazyCallBack);

//解析获取到的疯狂秒杀的数据
function crazyCallBack(data){
	var dataObj = JSON.parse(data);
	for(var index in dataObj.product){
		var goods = dataObj.product[index];
		crazyDom(goods,index)
	}
	console.log(dataObj.product[6].app_mimg);
	console.log(dataObj.product[6].img);
}

//
function crazyDom(obj,index){
	var $dl = $('<dl class="clear-f"></dl>').html(
		'<dt style="background-image:url('+ obj.img +')"></dt>'+
		'<dd>'+
			'<p class="crazy-shopping-title">'+ obj.name +'</p>'+
			'<p class="crazy-shopping-kg">'+ obj.specifics +'</p>'+
			'<p class="crazy-shopping-price"><span>￥<strong>'+ obj.price +'</strong></span>/原价'+obj.market_price+'元</p>'+
			'<p class="crazy-shopping-buy">'+obj.btnText+'</p>'+
		'</dd>'
	)
	if(index < 5){
		$($(".shopping-one")[0]).append($dl);
	}else if(index < 10){
		$($(".shopping-one")[1]).append($dl);
	}else if(index < 15){
		$($(".shopping-one")[2]).append($dl);
	}else{
		$($(".shopping-one")[3]).append($dl);
	}

}



//获取并解析获取到闪送超市的数据
function flashBack(data,num){
	//获取闪送超市的数据
	sendAjax("apicategory.php",data,flashCallBack);
	
	function flashCallBack(data){
		var dataObj = JSON.parse(data);
		for(var index in dataObj.data){
			var goods = dataObj.data[index];
			flashDom(goods);
		}
	}
	
	//将数据添加到dom数中
	function flashDom(obj){
			//
			var $a = $('<a href="javascript:;"></a>').html(
				'<dl class="shop-list clear-f">'+
					'<dt style=background-image:url('+ obj.img +')></dt>'+
					'<dd class="shop-title">'+
					obj.name+
					'</dd>'+
					'<dd class="collect">'+
						'<span>精选</span>'+
					'</dd>'+
					'<dd class="kg">'+
						obj.specifics +
					'</dd>'+
					'<dd class="price">'+
						'￥'+obj.price +'<span>￥&nbsp;&nbsp;'+obj.market_price+'</span>'+
					'</dd>'+
					'<dd class="select">'+
						'<span>+</span>'+
					'</dd>'+
				'</dl>'
			)
			$($(".content-wrap")[num]).append($a);
	}
}

flashBack("category=热销榜",0);
flashBack("category=天天特价",1);
flashBack("category=优选水果",2);
flashBack("category=牛奶面包",3);

