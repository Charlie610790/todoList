'use strict';

// Model
var Chore = Backbone.Model.extend({
 
    initialize: function() {
        this.on('change', function(){
      // here is the future
        });
    },
 
    defaults: {
        human: true
    },
 
    idAttribute: '_id'
});
 
var ChoreCollection = Backbone.Collection.extend({
 
    model: Chore,
 
    url: 'http://tiny-pizza-server.herokuapp.com/collections/CharlieToDoList',
});
 
 
 
 
var ChoreView = Backbone.View.extend({
 
    template: _.template($('.user-list-item').text()),
    editTemplate: _.template($('.user-list-edit-item').text()),
 
    events: {
        'click .edit-button'    : 'showEdit',
        'click .save-button'    : 'saveChanges',
        'click .delete-button'  : 'destroy',
        'keydown input'         : 'checkForChanges'
 
    },
 
    initialize: function(){
 
        this.listenTo(this.model, 'change', this.render);
 
 
        $('.container').prepend(this.el);
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
    }
});
 
// create instances
 
var coolChores = new ChoreCollection();
 
coolChores.fetch().done(function(){
    coolChores.each(function(chore){
        new ChoreView({model: chore});
    });
});