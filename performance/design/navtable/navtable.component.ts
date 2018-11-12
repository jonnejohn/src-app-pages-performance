import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

// import { ScorecardService } from '../../../../@core/data/performance/common/scorecard.service';

@Component({
  selector: 'ngx-navtable',
  styleUrls: ['./navtable.component.scss'],
  templateUrl: './navtable.component.html',
})

export class NavTableComponent implements OnInit{
	// data: Array<any>;
	 SYAAServiceAPI = "http://qprdemo.iycon.biz/SYAA_ServiceAPI/SyaaServiceAPI.svc";
  // constructor(private sService: ScorecardService) {
    // this.data = this.sService.getData();
//UIP=kPb1TguiqNNfK28stVab7GONh0MVC4PSlvXeN7D5r67.0LDXa8GWH3&USR=201503040&PASS=BHFIB+8VcF5urJs/syTbYA==
    // // this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      // // this.currentTheme = theme.name;
    // // });
  // }
  periodid:any;
  	PORTALURL:any;
	MODELID:any;
		 DATASOURCELOCATION:any;
	 dsl :any;
	 scorecards: any;
	 WSElementId:any;

	
  	ngOnInit() {
		//this.loadTableData();
	}

	loadTableData(){  
		 //var componentid = component.id;
         //var componentParameters =  component.parameters;
		 //var periodid = getQueryStringParameter("PER");
		 if(this.periodid == "")
			 this.periodid = "1_0_1938773693_-1";//appsetting["defaultPeriod"]
		 //var tableData = getChildElementsWithData(componentParameters.elementId,componentParameters.dataQuery);
	     //var tableData = getFilteredTableData(componentParameters.elementId,componentParameters.dataQuery,componentParameters.drillDownLevel,componentParameters.filterType,componentParameters.showReffered,componentParameters.scorecardId,componentParameters.selectedElementType,periodid);
		 var tableData = this.getFilteredTableData("1_0_1261180887_1442032910","HI:1:1:350%2cPV:4No%2520exceptions:0:1:1_0_1261180887_826359996.d.0%2cPV:4Minor%2520exceptions:0:1:1_0_1261180887_1366227428.d.0%2cPV:4Exceptions:0:1:1_0_1261180887_11786426.d.0%2cPV:4Controls%2520-%2520Not%2520performed:0:1:1_0_1261180887_167566987.d.0","2","1","0","1_0_1261180887_1754716680",["1st Process Main"],this.periodid);
		 //console.log(tableData);
		 //$("#tblNavigator"+'_tableTitle').html(componentParameters.title);
		 $("#tblNavigator").removeClass();
		 $("#tblNavigator").addClass("table");
		 //$("#tblNavigator").addClass(componentParameters.tableStyle);
		 //$("#tblNavigator").css("background-color",componentParameters.tableRowcolor);
		 $("#tblNavigator"+' thead tr').html("");
		 debugger;
		 $("#tblNavigator"+' thead tr').append("<th>Name</th>");
		 // $.each(componentParameters.columns, function(i, item) {
		 
			 // $("#tblNavigator"+' thead tr').append("<th>"+item.text+"</th>");
		 // });
		 $("#tblNavigator"+' tbody').html("");
		 $.each(tableData.LoadElementsDataResult, function(i, item) {
			 //adding name in the first column
			 console.log(item);
			  var columns = "<td style='width:250px'><img src='"+item.imgIcon+"' title='"+item.elementType+"'/>&nbsp;<a href='Default.aspx?R="+item.elementID+"'>"+item.name+"</a></td>";
			 $.each(item.navData, function(j, celldata)
			 {
				 //columns+="<td style='text-align:"+componentParameters.columns[j].align+";background-color:"+componentParameters.columns[j].cellcolor+"'>"+celldata.prettyvalue.replace("</tr></table>","");+"</td>";
				 columns+="<td>"+celldata.prettyvalue.replace("</tr></table>","");+"</td>";
				 
			 });
			 columns="<tr>"+columns+"</tr>";
			 $("#tblNavigator"+' tbody').append(columns);
		 });
		 
		 //$("#tblNavigator"+' thead tr').css("background-color",componentParameters.tableHeadercolor);
}


getFilteredTableData(elementID, dataquery, expandlevel, filtertype, showreffered, scorecardId, selectedelementtypes, periodID){
    //loadUserDetailsFromCookie();
    this.PORTALURL = "http://qprdemo.iycon.biz/QPR2017-1/Portal/QPR.Isapi.dll";//document.getElementById('ikey').value;
    this.MODELID = "1261180887";//appsetting["DefaultModelID"];
	this.WSElementId = elementID.replace("1_0_","SC.");
	this.WSElementId = this.WSElementId.replace("_",".");
	
	var WSScorecardId = scorecardId.replace("1_0_","SC.");
	WSScorecardId = WSScorecardId.replace("_",".");
	
	var filter = "";
	var condition = filtertype == "1" ? "OR" : "AND";
	var oper = filtertype == "1" ? "=" : "<>";
	$.each(selectedelementtypes,function(i,s) {
		filter += "typename"+oper+"\"" + s + "\" "+condition+" ";
	});
	
	console.log(filter);
	if (!(filter==""))
		filter = "(typename <> \"Top element\" AND typename <> \"Scorecard\") AND level<=" + expandlevel + " AND (" + filter.substr(0, filter.length - 4) + ")";
	else
		filter = "(typename <> \"Top element\" AND typename <> \"Scorecard\") AND level<=" + expandlevel;
	
	console.log(filter);
	debugger;
	var xml = this.qprQueryObjectAsXML("201503040","BHFIB+8VcF5urJs/syTbYA==","["+this.WSElementId+"].childobjects(Recursive=1)", filter, "index", "id,name,typename,iconurl,level,scorecardid", "");
	var returnObjects = [];
	$(xml).find('object').each(function(){
		  var idtext = $(this).attr('id');
		  idtext = idtext.replace("SC.","1_0_");
		  idtext = idtext.replace(".","_");
		  var nametext = $(this).attr('name');
		  var typenametext = $(this).attr('typename');
		  var iconurltext = $(this).attr('iconurl');
		  var leveltext = $(this).attr('level');
		  var pscorecardid = $(this).attr('scorecardid');
		  // if(pscorecardid!=WSScorecardId)
		  // {
			  // var psid = pscorecardid.replace("SC.","1_0_");
			  // psid = psid.replace(".","_");
			  // if(scorecards.length==0) readListOfScorecards();
		
			  // var sr = scorecards.filter(function (s) {return s.id == psid;});
			  // if(sr.length>0)
			  // nametext += " ("+sr[0].name+")";
			
		  // }	  
		  
		  // if(pscorecardid==WSScorecardId || showreffered=="1")
		  returnObjects.push({elementID:idtext,name:nametext,elementType:typenametext,imgIcon:iconurltext,level:leveltext,parentID:pscorecardid,scorecardname:""});
		});
	
	console.log(returnObjects);
	var parameters = JSON.stringify({
		query: this.PORTALURL+"?FE=" + dataquery + "&MOD=" + this.MODELID+ "&PER=" + periodID,
		sessionID : "kPb1TguiqNNfK28stVab7GONh0MVC4PSlvXeN7D5r67.0LDXa8GWH3",
		elements:returnObjects,
		editMode : false,
		
	});
	
	
	
	return this.ajaxCall("LoadElementsData",parameters);
}


	   qprQueryObjectAsXML(uname,upass,query,criteria,sortby,attributes,options){
			var parameters = JSON.stringify({
				username : uname,
				password : upass,
				query : query,
				criteria : criteria,
				sortby : sortby,
				attributes : attributes,
				options : options
			});
			//console.log(parameters);
			var queryResult =  this.ajaxCall("WSQueryObjectAsXml",parameters);
			var xml = queryResult.responseText;
			return xml;
		}

     getTable() {
        var uname = "201503040"; var upass = "BHFIB+8VcF5urJs/syTbYA=="; var query = "[SC.1261180887].Series"; var criteria = ""; var sortby = ""; var attributes = "id,name,typename,iconurl,level,scorecardid"; var options = "";
        var queryResult = this.qprQueryObjectAsXML(uname, upass, query, criteria, sortby, attributes, options);

        var returnObjects = [];
        $(queryResult).find('object').each(function () {
            var idtext = $(this).attr('id');
            var nametext = $(this).attr('name');
            var typenametext = $(this).attr('typename');
            var iconurltext = $(this).attr('iconurl');
            var leveltext = $(this).attr('level');
            var pscorecardid = $(this).attr('scorecardid');
            returnObjects.push({ id: idtext, name: nametext, typename: typenametext, iconurl: iconurltext, level: leveltext, scorecardid: pscorecardid });
        });
        //console.log(returnObjects);
        //return returnObjects;

        $.each(returnObjects, function (i, item) {
            $('#drpSeries').append($('<option>', {
                value: item.id,
                text: item.name
            }));
        });

    }


     ajaxCall(methodName,parameters){
	  var dataResult;
	  $.ajax({
			  url: this.SYAAServiceAPI+"/"+methodName,
			  type: "POST",
			  async: false,
			  data: parameters,
			  contentType: "application/json; charset=utf-8",
			  dataType: "json",
			  processData: true
		  }).then(function (result) {
			  console.log("Recieved Ajax Call response..!!");
			  dataResult = result;
			  console.log(dataResult);
		  }).fail(function (fail) {
		  dataResult = fail;
	  });
	  return dataResult;
  }
 
 // readListOfScorecards(){
	 // this.dsl = this.DATASOURCELOCATION + $("#drpProfiles").val()+"/";
	// $.ajax({
    // type: "GET",
	// async:false,
    // url: this.dsl+"scorecards.xml",
    // dataType: "xml",
    // success: function(xml){
		
		// $(xml).find('Scorecard').each(function(){
		  // var sid = $(this).attr('id');
		  // var sname = $(this).find('name').text();
		  // this.scorecards.push({id:sid,name:sname});
		// });
		// console.log(this.scorecards);
		
		// //return scorecards;
	// },
	// error: function() {
		// console.log("An error occurred while loading scorecards");
	// }

  // });
// }


 // ajaxCall(methodName,parameters){
	 // var dataResult;
	 // $.ajax({
			 // url: this.SYAAServiceAPI+"/"+methodName,
			 // type: "POST",
			 // async: false,
			 // data: parameters,
			 // contentType: "application/json; charset=utf-8",
			 // dataType: "json",
			 // processData: true,
			 // success: function(result){console.log(result);},
			 // error: function(error){}
		 // });
	 // return dataResult;
 // }
  
  }
