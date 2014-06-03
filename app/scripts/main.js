// Model
Chore = Backbone.Model.extend({
 
  initialize: function() {
    this.on('change', function(){
      // here is the future
    })
  },
 
defaults: {
    chore: 'new chore'
  },


  idAttribute: '_id'
});
 
UserCollection = Backbone.Collection.extend({
 
  model: Chore,
 
  url: 'http://tiny-pizza-server.herokuapp.com/collections/CharlieToDoList',
})
 
 
 
 
UserView = Backbone.View.extend({
 
  template: _.template($('.chore-list-item').text()),
  editTemplate: _.template($('.chore-list-edit-item').text()),
  // newChoreTemplate: _.template($('.new-chore-template').text()),
 
  events: {
    'click .edit-button'    : 'showEdit',
    'click .save-button'    : 'saveChanges',
    'click .delete-button'  : 'destroy',
    'click .newChoreButton' : 'addNewChore',
    'keydown input'         : 'checkForChanges'
 
  },
 
  initialize: function(){
 
    this.listenTo(this.model, 'change', this.render);
 
    $('.container').prepend(this.el);
    this.render();
  },
 
  render: function(){
    var renderedTemplate = this.template(this.model.attributes)
    this.$el.html(renderedTemplate);
  },
 
  showEdit: function(){
    var renderedTemplate = this.editTemplate(this.model.attributes)
    this.$el.html(renderedTemplate);
  },
 
  saveChanges: function(){
    var nameVal = this.$el.find('.name input').val();
    this.model.set('chore', nameVal);
    this.model.save()
  },
 
  destroy: function(){
    this.model.destroy();
    this.remove();
  },

  addNewChore: function (){
    var newChore = new Chore('chore', 'new chore');
    newChore.save();
    this.collection.add(newChore);
  },
 
  checkForChanges: function(){
    if (this.model.get('chore') !== this.$el.find('.name input').val()){
      this.$el.find('.name input').addClass('changed')
    } else {
      this.$el.find('.name input').removeClass('changed')
    }
  }
 
 
})
 
// create instances
 
var coolUsers = new UserCollection();
 
coolUsers.fetch().done(function(){
  coolUsers.each(function(user){
    new UserView({model: user});
  })
});