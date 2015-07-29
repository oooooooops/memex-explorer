(function(){
  $(document).ready(function(){

    var addCrawlForm = $("#addCrawlForm")

    function updateCrawlTable(jsonResponse){
      var template = _.template($("#crawlTableItem").html());
      $("#crawlTable > tbody:last-child").append(template(JSON.parse(jsonResponse)));
    }

    function cleanErrors(){
      crispyFormErrors.clearErrors(
        [
          "csrfmiddlewaretoken",
          "name",
          "description",
          "crawl_model",
          "rounds_left",
          "seeds_list",
          "crawler",
          "submit",
        ],
        "addCrawlForm"
      );
    }

    addCrawlForm.submit(function(event){
      event.preventDefault();

      var xhr = ajaxForms.xhrFactory(window.location.href + "add_crawl/", "addCrawlForm");
      var formData = ajaxForms.toFormData(addCrawlForm);

      var seeds_list = $("#id_seeds_list")[0].files[0]

      if (typeof seeds_list != 'undefined'){
        formData.append("seeds_list", seeds_list, seeds_list.name);
      }

      cleanErrors();

      xhr.send(formData);
      xhr.onreadystatechange = function(){
        if (xhr.readyState==4){
          updateCrawlTable(xhr.response);
          $("#crawlModal").modal('hide');
        }
      }

    })

    $("#cancelSubmit").click(function(){
      cleanErrors();
    })

  });
})();
