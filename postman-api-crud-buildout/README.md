# Classroom Example

## Set Up
- $ rails new classroom -d postgresql -T
- $ rails db:create
- $ rails generate resource Student name:string cohort:string
- This creates the model, controller, view folder, and all the routes
- Remove unnecessary files
- $ rails db:migrate
- $ rails c
- > Student.create name: "Austin", cohort: "Alpha"
- > Student.create name: "Heya", cohort: "Alpha"
- > Student.create name: "Meo", cohort: "Alpha"
- > Student.create name: "Xena", cohort: "Alpha"
- > Student.create name: "Kristen", cohort: "Foxtrot"
- > Student.all
- $ rails s

## Routes
- Don't need routes anymore
- $ rails routes
- path, http verb, url/param, controller#method

## Index
```  
def index
  @students = Student.all
  render json: @students
end
```
- Open Postman
- Headers >> key: content-type, value: application/json
- Navigate back to Params
- get localhost:3000/students

## Show
```
def show
  @student = Student.find(params[:id])
  render json: @student
end
```
- get localhost:3000/students/1


## Create
```
def create
  @student = Student.create(student_params)
  if @student.valid?
    render json: @student
  else
    render json: @student.errors
  end
end
```
- params
- private, makes it only available to the current class, anything below that line cannot be called from elsewhere
```
private
def student_params
  params.require(:student).permit(:name, :cohort)
end
```
- In Postman navigate to `Body` tab
- Select `raw` click button
- Enter a JSON object for a new animal
{
 	"student": {
  	"name": "Rachael",
  	"cohort": "Charlie",
    }
}
- Look at error
- Add `skip_before_action :verify_authenticity_token` to the file */app/controllers/application_controller.rb* which is the controller from which all other controllers inherit


## Delete
```
def destroy
  @student = Student.find(params[:id])
  if @student.destroy
    render json: @student
  else
    render json: @student.errors
  end
end
```
- delete localhost:3000/students/6
- get localhost:3000/students


## Update
```
def update
  @student = Student.find(params[:id])
  @student.update(student_params)
  if @student.valid?
    render json: @student
  else
    render json: @student.errors
  end
end
```

- get localhost:3000/4
- copy entry
- In Postman navigate to `body`
- change attributes, delete timestamps and id
- patch localhost:3000/4
