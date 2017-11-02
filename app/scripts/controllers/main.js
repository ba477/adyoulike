'use strict';

/**
 * @ngdoc function
 * @name adyoulikeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adyoulikeApp
 */
angular.module('adyoulikeApp')
  .controller('MainCtrl', function () {
      // Send request to grab data
          var urlApi = "https://historic-crater-lake-59853.herokuapp.com/";
          $.getJSON(urlApi , function(val) {
              var i;
              var campaigns = val.campaigns;
              var brands = val.brands;

              for (i = 0; i < campaigns.length; ++i) {
                  /* Déclaration des différentes value */
                  var IdCampaigns = campaigns[i].id;

                  /* Convertion des dates*/
                  var SDateCampaigns = campaigns[i].start_date;
                  var DateRaw = new Date(SDateCampaigns * 1000);
                  var num = DateRaw.getDate();
                  var j = DateRaw.getMonth() + 1;
                  var a = DateRaw.getFullYear();
                  var ParseDateStart = num + '/' + j + '/' + a;

                  /* Convertion des dates*/
                  var EdateCampaigns = campaigns[i].end_date;
                  var DateRaw2 = new Date(EdateCampaigns * 1000);
                  var num2 = DateRaw2.getDate();
                  var j2 = DateRaw2.getMonth() + 1;
                  var a2 = DateRaw2.getFullYear();
                  var ParseDateEnd = num2 + '/' + j2 + '/' + a2;

                  /* Si il n'y a pas clairement de fin à une campagne*/
                  if (ParseDateEnd === '1/1/1970'){
                      ParseDateEnd = 'Miss'
                  }

                  /* Association id brand au name brand*/
                  var BIdCampaigns  = val.campaigns[i].brand_id;
                    var collectionBrand ;
                    var y;
                  for (y = 0; y < brands.length; ++y) {
                      if (BIdCampaigns === brands[i].id) {
                          var BNameCampaigns  = brands[i].name;
                      }
                  }

                    /* Ajout des différentes campagnes présente dans l'api */
                  $('#campaigns').append(
                      '<tr class="campaig row">' +
                          '<td class="idCamp col-md-3"> ' + IdCampaigns + '</td>' +
                          '<td class="idCamp col-md-3"> ' + ParseDateStart + '</td>' +
                          '<td class="idCamp col-md-3"> ' + ParseDateEnd + '</td>' +
                          '<td class="idCamp col-md-3"> ' + BNameCampaigns + '</td>' +
                      '</tr>'
                  );

                  /*Ajout des marques au select*/
                  for (y = 0; y < 1; ++y) {
                      $('#ListBrands').append(
                          '<option value="' + brands[i].name +'">' + brands[i].name +'</option>'
                      );
                  }
              }
          });
                /* nouvelle campagne */
            $("#addCamp").click(function () {
                var u;
                var lenght =$(".campaig").length;
                for (u = 0  ; u < 1; ++u){
                  var inpBrand = $("#ListBrands").val();
                  var inpStart =$("#start").val() ;
                  var inpEnd =$("#end").val() ;
                  var idCamp = 123 + lenght ;


                  if( inpBrand != ""  && inpStart  != "" ){

                    $('#campaigns').append(
                        '<tr class="campaig row">' +
                        '<td class="idCamp col-md-3"> ' + idCamp + '</td>' +
                        '<td class="idCamp col-md-3"> ' + inpStart + '</td>' +
                        '<td class="idCamp col-md-3"> ' +  inpEnd + '</td>' +
                        '<td class="idCamp col-md-3"> ' + inpBrand + '</td>' +
                        '</tr>'
                    )
                  }
                }
            });

            /* gestion des datepicker*/
      angular.module('adyoulikeApp', ['ui.bootstrap'])
          .directive('utc', function() {
              return {
                  restrict: 'A',
                  priority: 1,
                  require: 'ngModel',
                  link: function(scope, element, attrs, ngModel) {

                      function utcToDate (date) {
                          if (date && angular.isString(date) && date.indexOf("T") > -1) {
                              date = date.substring(0, 10).split('-');
                              date = new Date(+date[0], +date[1] - 1, +date[2]);
                          }
                          return date;
                      }
                      scope.utcToDate = utcToDate;
                      scope.oneDay = 1000 * 60 * 60 * 24;
                      scope.today = new Date();
                      $scope.startDateBeforeRender = function($dates) {
                          const todaySinceMidnight = new Date();
                          todaySinceMidnight.setUTCHours(0,0,0,0);
                          $dates.filter(function (date) {
                              return date.utcDateValue < todaySinceMidnight.getTime();
                          }).forEach(function (date) {
                              date.selectable = false;
                          });
                      };
                      Date.prototype.toUtcString = function() {
                          function pad(number) {
                              if (number < 10) {
                                  return '0' + number;
                              }
                              return number;
                          }
                          var utcString = this.getFullYear() + "-" + pad(this.getMonth() + 1) + "-" + pad(this.getDate()) + "T00:00:00";
                          return utcString;
                      };
                      ngModel.$parsers.push(function(date) {
                          console.log("parse", date);
                          if(date.toUtcString) {
                              return date.toUtcString();
                          }
                          return date;
                      });

                      ngModel.$formatters.push(function (value) {
                          return utcToDate(value);
                      });
                  }
              };
          })

          .controller('MainCtrl', function($scope) {
              $scope.dates = {
                  start: "2017-11-02T00:00:00",
                  end: "2017-11-02T00:00:00"
              };
          });
  });
