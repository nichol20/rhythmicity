package repository

import (
	"context"
	"database/sql"
	"errors"

	db "github.com/nichol20/rhythmicity/auth-server/internal/db/gen"
	"github.com/nichol20/rhythmicity/auth-server/internal/domain"
)

type UserRepository struct {
	queries *db.Queries
}

func NewUserRepository(dbconn *sql.DB) *UserRepository {
	return &UserRepository{
		queries: db.New(dbconn),
	}
}

func (r *UserRepository) GetUser(ctx context.Context, id int32) (*domain.SensitiveUser, error) {
	user, err := r.queries.GetUser(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}

	return &domain.SensitiveUser{
		User: domain.User{
			ID:       user.ID,
			Username: user.Username,
			Email:    user.Email,
		},
		Password: user.Password,
	}, nil
}

func (r *UserRepository) GetUserByEmail(ctx context.Context, email string) (*domain.SensitiveUser, error) {
	user, err := r.queries.GetUserByEmail(ctx, email)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}

	return &domain.SensitiveUser{
		User: domain.User{
			ID:       user.ID,
			Username: user.Username,
			Email:    user.Email,
		},
		Password: user.Password,
	}, nil
}

type CreateUserParams struct {
	Username string
	Email    string
	Password string
}

func (r *UserRepository) CreateUser(ctx context.Context, arg CreateUserParams) (*domain.SensitiveUser, error) {
	if exists, err := r.queries.CheckIfEmailExists(ctx, arg.Email); err != nil {
		return nil, err
	} else if exists {
		return nil, domain.ErrEmailExists
	}

	user, err := r.queries.CreateUser(ctx, db.CreateUserParams{
		Username: arg.Username,
		Email:    arg.Email,
		Password: arg.Password,
	})

	if err != nil {
		return nil, err
	}

	return &domain.SensitiveUser{
		User: domain.User{
			ID:       user.ID,
			Username: user.Username,
			Email:    user.Email,
		},
		Password: user.Password,
	}, nil
}
