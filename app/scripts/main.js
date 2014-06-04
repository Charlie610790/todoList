'use strict';

// Model
var Chore = Backbone.Model.extend({
 
    initialize: function() {
        this.on('change', function(){
      // here is the future
        });
    },
 
    defaults: {
        chore: ''
    },
 
    idAttribute: '_id'
});
 
var ChoreCollection = Backbone.Collection.extend({
 
    model: Chore,
 
    url: 'http://tiny-pizza-server.herokuapp.com/collections/CharlieToDoList',
});
 
var ChoreView = Backbone.View.extend({
 
    template: _.template($('.chore-list-item').text()),
    editTemplate: _.template($('.chore-list-edit-item').text()),
 
    events: {
        'click .edit-button'    : 'showEdit',
        'click .save-button'    : 'saveChanges',
        'click .delete-button'  : 'destroy',
        'keydown input'         : 'checkForChanges',
        'click .choreName'      : 'done'
 
    },
 
    initialize: function(){
        this.listenTo(this.model, 'change', this.render);
 
        $('.writingSpace').prepend(this.el);
        this.render();
    },
 
    render: function(){
        var renderedTemplate = this.template(this.model.attributes);
        this.$el.html(renderedTemplate);
    },
 
    showEdit: function(){
        var renderedTemplate = this.editTemplate(this.model.attributes);
        this.$el.html(renderedTemplate);
    },
 
    saveChanges: function(){
        var nameVal = this.$el.find('.choreName input').val();
        this.model.set('chore', nameVal);
        this.model.save();
    },
 
    destroy: function(){
        this.model.destroy();
        this.remove();
    },
 
    checkForChanges: function(){
        if (this.model.get('chore') !== this.$el.find('.choreName input').val()){
            this.$el.find('.choreName input').addClass('changed');
        } else {
            this.$el.find('.choreName input').removeClass('changed');
        }
    },

    done: function () {
        this.$el.find('.done').toggleClass('doneClicked');
        // this.$el.find('.choreName').text('');

    }

});

var ChoreView2 = Backbone.View.extend({

    initialize : function(){
        console.log("initializing view");
        collection.on('add', this.render, this);
        collection.on('reset', this.render, this);
        this.render();
    },

    render: function(){
        var renderedTemplate = this.template(this.model.attributes);
        this.$el.html(renderedTemplate);
    },

});
 
// create instances and fills the list when the page is loaded
 
var coolChores = new ChoreCollection();
 
coolChores.fetch().done(function(){
    coolChores.each(function(chore){
        new ChoreView({model: chore});
    });
});

//action that happens when the new chore button is clicked
$('.newChoreButton').click(function() {
    //creates a new instance of the constructor Chore 
    outgoingChore = new Chore();

    updateChoreList(outgoingChore);

});

//Function that takes whatever arguments is passed and runs it with the JSON post to the URL listed beleo
function updateChoreList(choreStuff) {
    $.post('http://tiny-pizza-server.herokuapp.com/collections/CharlieToDoList', choreStuff);
}