USE [MiVet]
GO
/****** Object:  Table [dbo].[VetProfiles]    Script Date: 10/13/2022 9:45:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VetProfiles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Bio] [nvarchar](max) NULL,
	[Phone] [varchar](50) NOT NULL,
	[BusinessEmail] [nvarchar](255) NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[EmergencyLine] [nvarchar](50) NULL,
 CONSTRAINT [PK_VetProfiles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[VetProfiles] ADD  CONSTRAINT [DF_VetProfiles_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[VetProfiles] ADD  CONSTRAINT [DF_VetProfiles_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[VetProfiles] ADD  CONSTRAINT [DF_VetProfiles_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[VetProfiles]  WITH CHECK ADD  CONSTRAINT [FK_VetProfiles_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[VetProfiles] CHECK CONSTRAINT [FK_VetProfiles_Users]
GO
