import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

// import { ScorecardService } from '../../../../@core/data/performance/common/scorecard.service';

@Component({
  selector: 'ngx-elements',
  styleUrls: ['./elements.component.scss'],
  templateUrl: './elements.component.html',
})

export class ElementsComponent implements OnInit{
	// data: Array<any>;
	 SYAAServiceAPI = "http://qprdemo.iycon.biz/SYAA_ServiceAPI/SyaaServiceAPI.svc";
  // constructor(private sService: ScorecardService) {
    // this.data = this.sService.getData();
//UIP=kPb1TguiqNNfK28stVab7GONh0MVC4PSlvXeN7D5r67.0LDXa8GWH3&USR=201503040&PASS=BHFIB+8VcF5urJs/syTbYA==
    // // this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      // // this.currentTheme = theme.name;
    // // });
  // }
  
  	ngOnInit() {
		this.getElements();
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

     getElements() {
        var uname = "201503040"; var upass = "BHFIB+8VcF5urJs/syTbYA=="; var query = "[SC.1261180887.779304020].Subobjects"; var criteria = ""; var sortby = ""; var attributes = "id,name,typename,iconurl,level,scorecardid"; var options = "";
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
            $('#drpElements').append($('<option>', {
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
