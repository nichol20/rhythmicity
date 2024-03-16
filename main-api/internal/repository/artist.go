package repository

import (
	"context"
	"database/sql"
	"errors"

	"github.com/google/uuid"
	db "github.com/nichol20/rhythmicity/main-api/internal/db/gen"
	"github.com/nichol20/rhythmicity/main-api/internal/domain"
	"github.com/nichol20/rhythmicity/main-api/internal/utils"
)

type ArtistRepository struct {
	queries *db.Queries
}

func NewArtistRepository(dbconn *sql.DB) *ArtistRepository {
	return &ArtistRepository{
		queries: db.New(dbconn),
	}
}

func (r *ArtistRepository) GetPopularArtists(ctx context.Context, limit int32) ([]domain.Artist, error) {
	artistsRow, err := r.queries.GetPopularArtists(ctx, limit)
	if err != nil {
		return nil, err
	}
	var artists []domain.Artist
	for _, v := range artistsRow {
		artist, err := r.createArtist(ctx, v)
		if err != nil {
			return nil, err
		}
		artists = append(artists, *artist)
	}
	return artists, err
}

func (r *ArtistRepository) GetArtist(ctx context.Context, artistID string) (*domain.Artist, error) {
	uuid, err := uuid.Parse(artistID)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	if exists, err := r.queries.CheckIfArtistExists(ctx, uuid); err != nil {
		return nil, err
	} else if !exists {
		return nil, domain.ErrNotFound
	}
	artistRow, err := r.queries.GetArtist(ctx, uuid)
	if err != nil {
		return nil, err
	}
	artist, err := r.createArtist(ctx, artistRow)
	return artist, err
}

func (r *ArtistRepository) GetSeveralArtists(ctx context.Context, artistIDs []string) ([]domain.Artist, error) {
	filteredIDs := utils.IDsToUUIDs(artistIDs)
	artistsRow, err := r.queries.GetSeveralArtists(ctx, filteredIDs)
	if err != nil {
		return nil, err
	}
	var artists []domain.Artist
	for _, v := range artistsRow {
		artist, err := r.createArtist(ctx, v)
		if err != nil {
			return nil, err
		}
		artists = append(artists, *artist)
	}
	return artists, nil
}

func (r *ArtistRepository) GetArtistsByTrackId(ctx context.Context, trackID string) ([]domain.Artist, error) {
	uuid, err := uuid.Parse(trackID)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	if exists, err := r.queries.CheckIfTrackExists(ctx, uuid); err != nil {
		return nil, err
	} else if !exists {
		return nil, domain.ErrNotFound
	}
	artistsRow, err := r.queries.GetArtistsByTrackId(ctx, uuid)
	if err != nil {
		return nil, err
	}
	var artists []domain.Artist
	for _, v := range artistsRow {
		artist, err := r.createArtist(ctx, v)
		if err != nil {
			return nil, err
		}
		artists = append(artists, *artist)
	}
	return artists, nil
}

func (r *ArtistRepository) GetArtistsByAlbumId(ctx context.Context, albumID string) ([]domain.Artist, error) {
	uuid, err := uuid.Parse(albumID)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	if exists, err := r.queries.CheckIfAlbumExists(ctx, uuid); err != nil {
		return nil, err
	} else if !exists {
		return nil, domain.ErrNotFound
	}
	artistsRow, err := r.queries.GetArtistsByAlbumId(ctx, uuid)
	if err != nil {
		return nil, err
	}
	var artists []domain.Artist
	for _, v := range artistsRow {
		artist, err := r.createArtist(ctx, v)
		if err != nil {
			return nil, err
		}
		artists = append(artists, *artist)
	}
	return artists, err
}

func (r *ArtistRepository) createArtist(ctx context.Context, row interface{}) (*domain.Artist, error) {
	a, err := utils.TypeConverter[db.GetArtistRow](row)
	if err != nil {
		return nil, errors.New("error converting row to db.GetArtistRow")
	}

	details, err := r.getArtistDetails(ctx, a.Artistid)
	if err != nil {
		return nil, err
	}

	return &domain.Artist{
		ID:     a.Artistid,
		Name:   a.Name,
		Genres: details.Genres,
		Styles: details.Styles,
		Spotify: domain.SpotifyArtist{
			Images: details.Images,
			Spotify: domain.Spotify{
				ID:         a.Spotifyid.String,
				Popularity: a.Spotifypopularity,
			},
		},
	}, nil
}

type ArtistDetails struct {
	Genres []string
	Styles []string
	Images []domain.Image
}

func (r *ArtistRepository) getArtistDetails(ctx context.Context, artistID uuid.UUID) (*ArtistDetails, error) {
	genres, err := r.queries.GetArtistGenres(ctx, artistID)
	if err != nil {
		return nil, err
	}
	styles, err := r.queries.GetArtistStyles(ctx, artistID)
	if err != nil {
		return nil, err
	}
	images, err := r.getSpotifyImages(ctx, artistID)
	if err != nil {
		return nil, err
	}
	return &ArtistDetails{
		Genres: genres,
		Styles: styles,
		Images: images,
	}, nil
}

func (r *ArtistRepository) getSpotifyImages(ctx context.Context, artistID uuid.UUID) ([]domain.Image, error) {
	imagesRow, err := r.queries.GetArtistSpotifyImages(ctx, artistID)
	if err != nil {
		return nil, err
	}
	var images []domain.Image
	for _, v := range imagesRow {
		image := domain.Image{
			Height: v.Height,
			Width:  v.Width,
			Url:    v.Url,
		}
		images = append(images, image)
	}

	return images, nil
}
