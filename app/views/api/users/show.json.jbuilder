json.extract! @user, :id, :email, :firstname, :lastname
json.reviews @user.reviews
json.reservations @user.reservations do |reservation|
    json.extract! reservation, :id, :date, :user_id, :restaurant_id
    json.extract! reservation.restaurant, :name, :address
end