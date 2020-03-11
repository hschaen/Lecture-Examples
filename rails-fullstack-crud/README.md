# Rails MVC CRUD

#### Creating a new Rails app:
```
$ rails new garden -d postgresql -T
$ cd garden
$ rails db:create
$ rails server
```

In a browser navigate to:
`http://localhost:3000`

## Creating a Model
- $ rails generate model Herb name:string is_watered:boolean
- $ rails db:migrate
- $ rails c
- > Herb.create name: "Basil", is_watered: true
- > Herb.create name: "Thyme", is_watered: true
- > Herb.create name: "Oregano", is_watered: false
- > Herb.create name: "Cilantro", is_watered: false
- > Herb.create name: "Rosemary", is_watered: true

## Creating a Controller
- Controller takes a route from the internet and looks up information in the database (middleware)
- $ rails generate controller Herb
- remove unnecessary files

## Index
- Controller: create an index method
```
class HerbController < ApplicationController
  def index
    @herbs = Herb.all
  end
end
```
- Route
```
get "/herbs" => "herb#index"
```
- View: index.html.erb
```
<h1>Herbs</h1>

<ul>
  <% @herbs.each do |herb| %>
    <li>
      <%= herb.name %>
    </li>
  <% end %>
</ul>
```

## Show
- Controller: create an show method
```
def show
  @herb = Herb.find(params[:id])
end
```
- Route
```
get "/herbs/:id" => "herb#show"
```
- View: show.html.erb
```
<h1><%= @herb.name %></h1>
<p>Needs water: <%= @herb.is_watered %></p>
```


## Links
- read section in the syllabus
- Index Route: back from show to index
```
get '/herbs' => 'herb#index', as: 'all_herbs'
```
- View
```
<p>Back to <%=link_to "All Herbs", all_herbs_path %></p>
```
- Show Route: from index to show
```
get '/herb/:id' => 'herb#show', as: 'one_herb'
```
- View
```
<li> <%= link_to herb.name, one_herb_path(herb)%> </li>
```

## Form
- Controller: create the form view
```
def new
  # because of Rails naming conventions, we don't need to have a render here, but really this is happening:
  # render "new.html.erb"
end
```
- Route
```
get "/herbs/new" => "herb#new", as: "new_herb"
```
- View
```
<h1>Add a Herb</h1>
<%= form_with url: "/herbs/new", local: true do %>
<label for="name">Herb Name</label>
<input type="text" name="name">
<br>
<label for="is_watered">Is Watered?</label>
<input type="text" name="is_watered">
<br>
<input type="submit" name="" value="submit">
<% end %>
```
- Controller: create a new entry
```
def create
  @herb = Herb.create(
    name: params[:name],
    is_watered: params[:is_watered]
  )
  if @herb.valid?
    redirect_to @herb
  else
    render action: :new
  end
end
```
- Route
```
post "herbs" => "herb#create"
```
- View: route to the show page


## Delete
- Controller: delete an entry
```
def delete
  @herb = Herb.find(params[:id])
  if @herb.destroy
    redirect_to all_herbs_path
  else
    redirect_to herb_path(@herb)
  end
end
 ```
- Route
```
delete "herb/:id" => "herb#delete", as: "delete_herb"
```
- View: on the show one page
```
<br />
<%= link_to "Delete", delete_herb_path(@herb), method: :delete %>
```


## Strong Params
- Controller: params method
```
private
def herb_params
  params.require(:herb).permit(:name, :is_watered)
end
```
Private - a type method that you can ONLY call from inside the class where it's defined. This allows you to control access to your methods.
Permits - allows the values but doesn't require
- View
```
<%= form_with model: @herb, local: true do |form| %>
  <%= form.label :name %>
  <%= form.text_field :name %>
  <br />
  <%= form.label :is_watered %>
  <%= form.text_field :is_watered  %>
  <br />
  <%= form.submit :create %>
<% end %>
```

## Validations
validates :name, :is_watered, presence: true
validates :name, uniqueness: true

validate :should_be_true_or_false
  errors.add(:is_watered, "should be true or false")

def should_be_true_or_false
  if  
end
