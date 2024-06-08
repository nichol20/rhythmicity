package domain

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}

type SensitiveUser struct {
	User
	Password string
}
